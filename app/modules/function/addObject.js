import Matter from "matter-js"

import { main } from "../../app1" //TODO 

import { attachFilter_All, attachFilter_Mouse } from "./attachFilter"
import { createConstraint } from "./createConstraint"
import { createObjct } from "./createObject"
import { addObjects } from "./addObjects"

export { update_after_adding, addCircle, addSquare, addTri, addBar, addPlayer, deleteObj, addConstraint, addLib }


function deleteObj() {
  if (main.objects[main.mouse.prev1.id].type === "Player") {
    main.player.exist=false;
    main.player.obj.type = "body";
  }
  Matter.World.remove(main.scene.engine.world, main.objects[main.mouse.prev1.id]);
  main.objects[main.mouse.prev1.id] = undefined
};

function update_after_adding(obj) {
  if (main.scene.engine.world.gravity.y == 0) {//開始前、マウスのみ接触
    attachFilter_Mouse(obj);
  }
  else {
    attachFilter_All(obj);
    obj.frictionAir = 0;
  }
  main.mouse.prev2.id = main.mouse.prev1.id;
  main.mouse.prev1.id = obj.id;

  main.objects[obj.id] = obj;
  main.scene.idCnt = obj.id; //最後のidをメモ
}

function addSquare() {
  document.forms.controlForm.elements[0].value = "Square Body";
  let obj = control2obj();
  update_after_adding(obj);

  Matter.World.add(main.scene.engine.world, obj);
}

function addTri() {
  document.forms.controlForm.elements[0].value = "Triangle Body";
  let obj = control2obj();
  update_after_adding(obj);

  Matter.World.add(main.scene.engine.world, obj);
};

function addCircle() {
  document.forms.controlForm.elements[0].value = "Circle Body";
  let obj = control2obj();
  update_after_adding(obj);

  Matter.World.add(main.scene.engine.world, obj);
};
function addBar(x, y, color, length) {
  /*document.forms.controlForm.elements[0].value = "Bar Body";
  let obj = control2obj();
  update_after_adding(obj);
  Matter.World.add(main.scene.engine.world, obj);*/

  addCar();
}
function addPlayer() {
  main.player.obj = Matter.Bodies.circle(main.scene.width / 2, main.scene.height/2, main.scene.standardRad, {
    density: 0.001,
    //friction:0,
    //frictionAir:0,
    restitution: 0.3,
    render: {
      sprite: { //スプライトの設定
        texture: '../img/rainboww.png' //テクスチャ画像を指定
      }
    }
  });
  main.player.obj.scale = 1;
  update_after_adding(main.player.obj);
  Matter.World.add(main.scene.engine.world, main.player.obj);
  main.player.init();
}
function addConstraint() {
  const prev1 = main.mouse.prev1;
  const prev2 = main.mouse.prev2;
  if (prev1.id > 0 && prev2.id > 0 && prev1.id != prev2.id) {
    const constraint = createConstraint(main.objects, prev1.id, prev2.id,
      prev1.offset.x, prev1.offset.y, prev2.offset.x, prev2.offset.y);

    Matter.World.add(main.scene.engine.world, constraint);
    main.objects[constraint.id] = constraint;
    main.scene.idCnt = constraint.id;
  }
};

export function control2obj() {
  const Elements = document.forms[0];
  const { data1, data2 } = Control_Size2data(Elements[0].value, Elements[4].value);
  const obj = createObjct(Elements[0].value, Number(Elements[1].value), Number(Elements[2].value),
    Elements[7].value, Elements[8].checked,
    Elements[3].value / 100, Elements[5].value / 10000, Elements[6].value / 100,
    data1, data2, Elements[4].value / 100);
  //type,x,y,color,isStatic,angle,density,restitution,data1,data2,scale
  return obj;
};

function Control_Size2data(label, rangeValue) { //[50,200] TODO: 調整
  let data1, data2;
  switch (label) {
    case 'Circle Body':
      data1 = main.scene.standardRad * rangeValue / 100;
      break;
    case 'Square Body':
      data1 = data2 = rangeValue / 100 * main.scene.standardSide;
      break;
    case 'Triangle Body':
      data1 = rangeValue / 100 * main.scene.standardRad;
      break;
    case 'Bar Body':
      data1 = rangeValue / 100 * main.scene.standardSide * 2;
      break;
  }
  return { data1, data2 };
}

function addLib(sceneId) {
  const hostURL = "http://localhost:8000";
  const hostUrl = hostURL + "/addLibrary/" + sceneId;

  $.ajax({
    url: hostUrl,
    type: "POST",
    data: { sceneId: sceneId },
    dataType: "json",
    scriptCharset: "utf-8",
    timeout: 3000
  }
  ).then(
    (data) => {
      addObjects(main, data.objects);
    },
    (XMLHttpRequest, textStatus, errorThrown) => {
      console.log("error");
      console.log("XMLHttpRequest : " + XMLHttpRequest.status);
      console.log("textStatus     : " + textStatus);
      console.log("errorThrown    : " + errorThrown.message);
    }
  )
}

/*
function addIntervalObject() {
  let total = 100;
  setInterval(() => {
    if (total-- > 0) {
      control2obj();
    }
  }, 200)
}*/
function addCar() {
  const xx = 50, yy = 50, wheelSize = 30;
  const wheelBase = 20,
    wheelAOffset = -120 * 0.5 + wheelBase,
    wheelBOffset = 120 * 0.5 - wheelBase,
    wheelYOffset = 0;
  let rec = createObjct("Rectangle Body", xx, yy, null, false, 0, 0.0001, 0.1, 120, 30, 1);
  let cir1 = createObjct("Circle Body", xx + wheelAOffset, yy + wheelYOffset, null, false, 0, 0.0001, 0.1, wheelSize, 30, 1);
  let cir2 = createObjct("Circle Body", xx + wheelBOffset, yy + wheelYOffset, null, false, 0, 0.0001, 0.1, wheelSize, 30, 1);
  update_after_adding(rec)
  update_after_adding(cir1)
  update_after_adding(cir2)
  cir1.friction = 0;
  cir2.friction = 0;
  Matter.World.add(main.scene.engine.world, [rec, cir1, cir2]);
  let constraint1 = createConstraint(main.objects, rec.id, cir1.id, wheelAOffset, wheelYOffset, 0, 0);
  Matter.World.add(main.scene.engine.world, constraint1);
  main.objects[constraint1.id] = constraint1;
  let constraint2 = createConstraint(main.objects, rec.id, cir2.id, wheelBOffset, wheelYOffset, 0, 0)
  Matter.World.add(main.scene.engine.world, constraint2);
  main.objects[constraint2.id] = constraint2;
  main.scene.idCnt = constraint2.id;
}

function addFuriko() {
  let rec = createObjct("Rectangle Body", main.scene.width / 2, 150, null, true, 0, 0.001, 0, 20, 20, 1);
  let cir = createObjct("Circle Body", main.scene.width / 2, 400, null, false, 0, 0.001, 1, 50, 20, 1);
  let constraint = Matter.Constraint.create({
    bodyA: rec,
    bodyB: cir,
    stiffness: 1
  })
  update_after_adding(rec);
  update_after_adding(cir);
  Matter.World.add(main.scene.engine.world, [rec, cir, constraint]);
  objects[constraint.id] = constraint;
}

function addfield() {
  let tmp = []
  const width = main.scene.width;
  const height = main.scene.height;
  tmp[0] = createObjct("Rectangle Body", width / 2, height, '#2e2b44', true, 0, 0.005, 0, width, 60, 1)
  tmp[1] = createObjct("Rectangle Body", 0, height / 2, '#2e2b44', true, 0, 0.005, 0, 60, height, 1)
  tmp[2] = createObjct("Rectangle Body", width, height / 2, '#2e2b44', true, 0, 0.005, 0, 60, height, 1)
  for (let i in tmp) {
    update_after_adding(tmp[i]);
    Matter.World.add(main.scene.engine.world, tmp[i]);
  }
}
function addBallPyramid() {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j <= i; j++) {
      const x = (main.scene.width / 2 - i * 35) + j * 70;
      const y = 50 + i * 50;
      let tmp = createObjct("Circle Body", x, y, 'gray', true, 0, 0.001, 0, 10, 0, 1);
      update_after_adding(tmp);
      Matter.World.add(main.scene.engine.world, tmp);
    }
  }
}

/*
function createStack(numX, numY) {
    let stackA = Composites.stack(100, 100, numX, numY, 0, 0, function (x, y) {
        return Matter.Bodies.rectangle(x, y, 15, 15);
    });
    World.add(engine.world, stackA);
    console.log(stackA)
    stackA.Matter.Bodies.map((c) => {
        objects[c.id]=c;
    })
}*/