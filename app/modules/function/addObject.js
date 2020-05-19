import Matter from "matter-js"

import { main } from "../../app1" //TODO 

import { attachFilter_All, attachFilter_Mouse } from "./attachFilter"
import { createConstraint } from "./createConstraint"
import { createObjct } from "./createObject"
import {addObjects} from "./addObjects"

export { update_after_adding,addCircle, addSquare, addTri,addBar, addPlayer,deleteObj, addConstraint, addLib }


function deleteObj() {
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
  var obj = control2obj();
  console.log(obj)
  update_after_adding(obj);

  Matter.World.add(main.scene.engine.world, obj);
}

function addTri() {
  document.forms.controlForm.elements[0].value = "Triangle Body";
  var obj = control2obj();
  update_after_adding(obj);

  Matter.World.add(main.scene.engine.world, obj);
};

function addCircle() {
  document.forms.controlForm.elements[0].value = "Circle Body";
  var obj = control2obj();
  update_after_adding(obj);

  Matter.World.add(main.scene.engine.world, obj);
};
function addBar(x, y, color, length) {
  document.forms.controlForm.elements[0].value = "Bar Body";
  var obj = control2obj();
  update_after_adding(obj);

  Matter.World.add(main.scene.engine.world, obj);
}
function addPlayer(){
  main.player.obj = control2obj();
  update_after_adding(main.player.obj);
  Matter.World.add(main.scene.engine.world, main.player.obj);
  main.player.init();
}
function addConstraint() {
  const prev1 = main.mouse.prev1;
  const prev2 = main.mouse.prev2;
  if (prev1.id > 0 && prev2.id > 0 && prev1.id != prev2.id) {
    const constraint = createConstraint(main.objects,prev1.id, prev2.id,
      prev1.offset.x, prev1.offset.y, prev2.offset.x, prev2.offset.y);

    Matter.World.add(main.scene.engine.world, constraint);
    main.objects[constraint.id] = constraint;
    main.scene.idCnt = constraint.id;
  }
};

export function control2obj() {
  var Elements = document.forms[0];
  var { data1, data2 } = Control_Size2data(Elements[0].value, Elements[4].value);
  var obj = createObjct(Elements[0].value, Number(Elements[1].value), Number(Elements[2].value),
    Elements[7].value, Elements[8].checked,
    Elements[3].value / 100, Elements[5].value / 10000, Elements[6].value / 100,
    data1, data2, Elements[4].value / 100);
  //type,x,y,color,isStatic,angle,density,restitution,data1,data2,scale
  return obj;
};

function Control_Size2data(label, rangeValue) { //[50,200] TODO: 調整
  var data1, data2;
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
      var tmp = main.scene.idCnt - 1;
      addObjects(main,data.objects);
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
}
function addCar(){
  var xx = 50,yy = 50,wheelSize = 30;
  var wheelBase = 20,
    wheelAOffset = -120 * 0.5 + wheelBase,
    wheelBOffset = 120 * 0.5 - wheelBase,
    wheelYOffset = 0;
  var rec = createObjct("Rectangle Body", xx, yy, null, false, 0,0.0001, 0.1, 120, 30, 1) ;
  var cir1 = createObjct("Circle Body", xx+wheelAOffset, yy+wheelYOffset, null, false, 0,0.0001, 0.1, wheelSize, 30, 1) ;
  var cir2 =createObjct("Circle Body", xx+wheelBOffset, yy+wheelYOffset, null, false, 0,0.0001, 0.1, wheelSize, 30, 1) ;
  addConstraint(rec.id,cir1.id,wheelAOffset, wheelYOffset,0,0)       
  addConstraint(rec.id,cir2.id,wheelBOffset, wheelYOffset,0,0)                     
}
*/