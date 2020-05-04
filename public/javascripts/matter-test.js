//初期オブジェクト
var circleA = Bodies.circle(450, 50, 30, {
  render: {
    fillStyle: 'red'
  },
  inertia:Infinity
});
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





// ボタンを押したときに図形を増やす
$(document).on('click', '#addRec', function () {
  addRectangle(400, 200, 50, 50);
  console.log(objects[4])

});

$(document).on('click', '#addPole', function () {
  var obj = Composites.newtonsCradle(400,200,1,20,100);
  World.add(engine.world,obj);
  //objects.push(obj);
});

function addForm(){
  console.log(document.forms)
};

function reduce_friction(obj, rate) {
  obj.friction = rate;
  obj.frictionAir = rate;
  obj.restitution =  0.5;
}
function addStack(numX,numY){
  var stackA = Composites.stack(100, 100, numX, numY, 0, 0, function(x, y) {
    return Bodies.rectangle(x, y, 15, 15); 
  });
  World.add(engine.world,stackA);
  console.log(stackA)
  stackA.bodies.map((c)=>{
    objects.push(c);
  })
}
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


$(document).on('click', '#save', function () {
  
  var data = [];
  for (let i in objects) {
    var obj_type=0,data1=0,data2=0,data3=0;
    if (objects[i].label === "Circle Body") {
      obj_type = 1;
      data1 = objects[i].circleRadius;
    }
    else if (objects[i].label === "Rectangle Body") {
      obj_type = 2;
      data1 = objects[i].bounds.max.x - objects[i].bounds.min.x;
      data2 = objects[i].bounds.max.y - objects[i].bounds.min.y;
    }
    let tmp = {
      "type": obj_type,
      "x": objects[i].position.x,
      "y": objects[i].position.y,
      "color": objects[i].render.fillStyle,
      "isStatic": objects[i].isStatic,
      "data1": data1,
      "data2": data2
    }
    data.push(tmp);
  }
  
  var hostUrl = "http://localhost:8000/making/save";

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
      window.location.href = "http://localhost:8000/scenes/"+ data ;
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
