//初期オブジェクト
/*var circleA = Bodies.circle(450, 50, 30, {
  render: {
    fillStyle: 'red'
  },
  inertia:Infinity
});*/
var ground = Bodies.rectangle(width/2, height, width, 60, { isStatic: true }); //x,y,w,h
var kabeL = Bodies.rectangle(0, height/2, 60, height, { isStatic: true });
var kabeR = Bodies.rectangle(width, height/2, 60, height, { isStatic: true });
//reduce_friction(circleA, 0)

var prevClickObj = 2;
Events.on(mousedrag, "startdrag", function(e) {
  document.forms.myform.elements[0].value=mousedrag.body.label;
/*  document.forms.myform.elements[1].value=100;
  document.forms.myform.elements[2].value=100;
  document.forms.myform.elements[3].value=100;*/
  document.forms.myform.elements[4].value=mousedrag.body.render.fillStyle;
  document.forms.myform.elements[5].value=mousedrag.body.isStatic;
  prevClickObj = mousedrag.body.id - 1; //id は1-based index
  if(e.body.label == "ne") {
    console.log(e);
  }
});


objects.push( ground, kabeL, kabeR)
for(let i = 1;i<objects.length;i++){
  attachFilter(objects[i])
}
World.add(engine.world, objects);


$(document).on('click', '#addTri', function () {
  addPolygon(400,200,null,3,50);
});
$(document).on('click', '#addBall', function () {
  World.add(engine.world,
    Matter.Constraint.create({
      bodyA:objects[4],
      bodyB:objects[5]
    })
  )
});
// 
$(document).on('click', '#addRec', function () {
  addRectangle(400, 200, null,100, 100);
});
// 棒
$(document).on('click', '#addBar', function () {
  addRectangle(400,200,null,300,10);
});

function clickForm(){
  var Elements = document.forms.myform.elements;
  var type,data1,data2;
  if(document.forms.myform.key == 'add'){
    switch(Elements[0].value){
      case '●':
        type = "Circle Body";
        data1 = Elements[1].value;
        break;
      case '■':
        type = "Rectangle Body";
        data1 = data2 = Elements[1].value*2;
        break;
    }
    var obj = createObjct(type,400,200,Elements[4].value,Elements[5].checked,data1,data2);
    obj.restitution =  Elements[3].value/100 ;
    Matter.Body.setDensity(obj,Elements[2].value/10000);
  }
  else {
    objects[prevClickObj].isStatic = Elements[5].checked
  }
};


//開始はlib.js

//保存
$(document).on('click', '#save', function () {
  
  var data = [];
  for (let i = 1; i<objects.length;i++) {
    var obj_type=0,data1=0,data2=0,data3=0;
    if (objects[i].label === "Circle Body") {
      data1 = objects[i].circleRadius;
    }
    else if (objects[i].label === "Rectangle Body") {
      data1 = objects[i].bounds.max.x - objects[i].bounds.min.x;
      data2 = objects[i].bounds.max.y - objects[i].bounds.min.y;
    }
    let tmp = {
      "type": objects[i].label,
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
