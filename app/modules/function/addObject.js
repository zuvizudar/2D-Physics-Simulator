import Matter from "matter-js"

import { main } from "../../app1" //TODO 

import { Constraint } from "../class/Constraint"
import { createObject } from "./createObject"
import { addObjects } from "./addObjects"

export { addCircle, addSquare, addTri, addBar, addPlayer, addConstraint, addLib,addIntervalObject,addBumper,addCar }

function addSquare() {
  document.forms.controlForm.elements[0].value = "Square Body";
  let obj = control2obj();
  obj.addToWorld(main);
}

function addTri() {
  document.forms.controlForm.elements[0].value = "Triangle Body";
  let obj = control2obj();
  obj.addToWorld(main);
};

function addCircle() {
  document.forms.controlForm.elements[0].value = "Circle Body";
  let obj = control2obj();
  obj.addToWorld(main);
};
function addBar() {
  /*document.forms.controlForm.elements[0].value = "Bar Body";
  let obj = control2obj();
  obj.addToWorld(main);*/
  addfield();
}

function addPlayer() {
  main.player.init(main.scene.width/2,main.scene.height/2);
  console.log(main.player)
  main.player.addToWorld(main);
}
function addConstraint() {
  const prev1 = main.mouse.prev1;
  const prev2 = main.mouse.prev2;
  if (prev1.id > 0 && prev2.id > 0 && prev1.id != prev2.id) {
    let constraint = new Constraint(main.objects, prev1.id, prev2.id,
      prev1.offset.x, prev1.offset.y, prev2.offset.x, prev2.offset.y);

    constraint.addToWorld(main);
  }
};
function copyControl(){
  const Elements = document.forms[0];
  const { data1, data2 } = Control_Size2data(Elements[0].value, Elements[4].value);
  const options ={
    render:{
      fillStyle:Elements[7].value
    },
    angle:Elements[3].value/100,
    density:Elements[5].value/10000,
    restitution:Elements[6].value/100,
    scale:Elements[4].value/100
  }
  const label = Elements[0].value,
        x = Number(Elements[1].value),
        y = Number(Elements[2].value);
  const isStatic = Elements[8].checked;
  return{
    label,x,y,data1,data2,options,isStatic
  }
}
export function control2obj() {
  const arg = copyControl();
  const obj = createObject(arg.label,arg.x,arg.y,arg.data1,arg.data2,null,arg.options,arg.isStatic);
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


function addIntervalObject() {
  const arg = copyControl();
  const obj = createObject(arg.label,arg.x,arg.y,arg.data1,arg.data2,null,arg.options,arg.isStatic);
  obj.addToWorld(main);
  setInterval(() => {
    if(main.scene.isRunning){
      const obj = createObject(arg.label,arg.x,arg.y,arg.data1,arg.data2,null,arg.options,arg.isStatic);
      obj.addToWorld(main);
    }
  },1000)
}
function addBumper() {
  document.forms.controlForm.elements[0].value = "Circle Body";
  //let obj = control2obj();
  const arg = copyControl();
  const obj = createObject(arg.label,arg.x,arg.y,arg.data1,arg.data2,1,arg.options,arg.isStatic); //data3=1
  obj.addToWorld(main);
}

function addCar() {
  const xx = 50, yy = 50, wheelSize = 30;
  const wheelBase = 20,
    wheelAOffset = -120 * 0.5 + wheelBase,
    wheelBOffset = 120 * 0.5 - wheelBase,
    wheelYOffset = 0;
    const rec_options ={
      scale:1
    }
    const cir_options ={
      render:{
        fillStyle:"red"
      },
      restitution:0.1,
      scale:1,
      friction:0
    }
  let rec = createObject("Rectangle Body", xx, yy, 120, 30,null,rec_options,false);
  let cir1 = createObject("Circle Body", xx + wheelAOffset, yy + wheelYOffset,wheelSize, 30,null,cir_options,false);
  let cir2 = createObject("Circle Body", xx + wheelBOffset, yy + wheelYOffset, wheelSize, 30,null,cir_options,false);
  rec.addToWorld(main);
  cir1.addToWorld(main);
  cir2.addToWorld(main);

  let constraint1 = new Constraint(main.objects, rec.body.id, cir1.body.id, wheelAOffset, wheelYOffset, 0, 0);
  constraint1.addToWorld(main);
  let constraint2 = new Constraint(main.objects, rec.body.id, cir2.body.id, wheelBOffset, wheelYOffset, 0, 0)
  constraint2.addToWorld(main);
}

function addFuriko() {
  const options = {
    scale:1
  }
  let rec = createObject("Rectangle Body", main.scene.width / 2, 150, 20, 20,null,options,true);
  let cir = createObject("Circle Body", main.scene.width / 2, 400,  50, 20,null,options,false);
  let constraint = Matter.Constraint.create({
    bodyA: rec,
    bodyB: cir,
    stiffness: 1
  })
  rec.addToWorld(main);
  cir.addToWorld(main);
  Matter.World.add(main.scene.world,constraint);
}

function addfield() {
  let tmp = []
  const width = main.scene.width;
  const height = main.scene.height;
  const options ={
    render:{
      fillStyle:'#2e2b44'
    },
    angle:0,
    density:0.005,
    restitution:0,
    scale:1
  }
  tmp[0] = createObject("Rectangle Body", width / 2, height,width,60, null,options,true);
  tmp[1] = createObject("Rectangle Body", 0, height / 2, 60,height,null,options,true);
  tmp[2] = createObject("Rectangle Body", width, height / 2, 60,height,null,options,true);
  for (let i in tmp) {
    tmp[i].addToWorld(main);
  }
}
function addBallPyramid() {
  const options ={
    render:{
      fillStyle:'gray'
    },
    angle:0,
    density:0.001,
    restitution:0,
    scale:1
  }
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j <= i; j++) {
      const x = (main.scene.width / 2 - i * 35) + j * 70;
      const y = 50 + i * 50;

      let tmp = createObject("Circle Body", x, y,10,null,options, true);
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