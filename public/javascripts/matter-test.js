
var Engine = Matter.Engine;
var World = Matter.World;
var Bodies = Matter.Bodies;
var Render = Matter.Render;
var Mouse = Matter.Mouse;
var Events = Matter.Events;

// Matter.js エンジン作成
var engine = Engine.create();
var width = 700,
    height = 500;
var render = Render.create({
  element: document.getElementById("canvas"),
  engine: engine,
  options: {
    width: width,
    height: height,
    wireframes: false
  }
});

var circleA = Bodies.circle(450, 50, 30, {
  render: {
    fillStyle: 'red'
  },
  inertia:Infinity
});

// isStatic:静的(完全固定) 
var ground = Bodies.rectangle(width/2, height, width, 60, { isStatic: true }); //x,y,w,h
var kabeL = Bodies.rectangle(0, height/2, 60, height, { isStatic: true });
var kabeR = Bodies.rectangle(width, height/2, 60, height, { isStatic: true });
reduce_friction(circleA, 0)
var objects =[]
objects.push(circleA, ground, kabeL, kabeR)
for(let i in objects){
  fillter_obj(objects[i])
}
World.add(engine.world, objects);
engine.world.gravity.y = 0;
var mousedrag = Matter.MouseConstraint.create(engine, {
  mouse: Mouse.create(render.canvas),
  constraint: {
    stiffness: 1,
    render: {
      visible: false
    }
  }
});
mousedrag.collisionFilter={
  'group':1,
  'category':1,
  'mask':2,
}

World.add(engine.world, mousedrag);
render.mouse = mousedrag
function start_simulation() {
  engine.world.grabity.y = 1;
}
//boxA.restitution=0.001;
function reduce_friction(obj, rate) {
  obj.friction = rate;
  obj.frictionAir = rate;
  obj.restitution =  0.5;
}

var form = document.createElement('form');
var request = document.createElement('input');

Render.run(render);
(function run() {
  window.requestAnimationFrame(run);
  Engine.update(engine, 1000 / 60);
})();
var fps = 30;

// ボタンを押したときに図形を増やす
$(document).on('click', '#addRec', function () {
  addRectangle(400, 200, 50, 50);
});
function addForm(){
  console.log(document.forms)
};

$(document).on('click', '#save', function () {
  
  var data = [];
  for (let i in objects) {
    let obj_type = 0;
    if (objects[i].type === "Rectangle Body") obj_type = 1;
    else if (objects[i].type === "Circle Body") obj_type = 2
    let tmp = {
      "type": obj_type,
      "x": objects[i].position.x,
      "y": objects[i].position.y,
      "rad": 0,
      "width": 80,
      "height": 80,
      "color": objects[i].render.fillStyle
    }
    data.push(tmp);
  }
  
  
  var hostUrl = "http://localhost:8000/test/";

  $.ajax({
    url: hostUrl,
    type: "POST",
    data: {"data": data},
    dataType: "text",
    scriptCharset: "utf-8",
    timeout: 3000
    }
  ).then(
    (data)=>{
      console.log("ok")
      window.location.href = "http://localhost:8000/test/scene/"+ data ;
    },
    (XMLHttpRequest, textStatus, errorThrown)=>{
      console.log("error");
      console.log("XMLHttpRequest : " + XMLHttpRequest.status);
      console.log("textStatus     : " + textStatus);
      console.log("errorThrown    : " + errorThrown.message);
    }
  )
});

$(document).on('click', '#start', function () {
  
  for(let i in objects){
    objects[i].collisionFilter.group = 1;
  }
  engine.world.gravity.y = 1
});

function addBall(x, y, rad) {
  var ball = Bodies.circle(x, y, rad);
  World.add(engine.world, ball);
  objects.push(ball);
}

function addRectangle(x, y, width, height) {
  let rectangle = Bodies.rectangle(x, y, width, height);
  rectangle.collisionFilter.group = 1;
  if(engine.world.gravity.y ==0)
    fillter_obj(rectangle);
  World.add(engine.world, rectangle);
  objects.push(rectangle);
}
function fillter_obj(obj){
  obj.collisionFilter={
    'group':0,
    'category':2,
    'mask':1,
  }
}