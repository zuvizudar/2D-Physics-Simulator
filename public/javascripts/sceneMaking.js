//初期オブジェクト
/*var circleA = Bodies.circle(450, 50, 30, {
  render: {
    fillStyle: 'red'
  },
  inertia:Infinity
});*/

fieldInit();
function fieldInit(){
  var ground = addRectangle(width/2, height, '#2e2b44',width, 60 );
  var kabeL = addRectangle(0, height/2, '#2e2b44',60, height);
  var kabeR = addRectangle(width, height/2, '#2e2b44',60, height);
  for(let i = 1;i<objects.length;i++){
    Matter.Body.setStatic(objects[i],true);
  }
}


//reduce_friction(circleA, 0)
var prevClickObj = 2;
Events.on(mousedrag, "mousedown", function(e) {
  document.forms.myform.elements[1].value = Math.floor(e.mouse.position.x);
  document.forms.myform.elements[2].value = Math.floor(e.mouse.position.y);
})
Events.on(mousedrag, "startdrag", function(e) {   // TODO : 変換
  document.forms.myform.elements[0].value=mousedrag.body.label;
  document.forms.myform.elements[3].value=50; //size
  document.forms.myform.elements[4].value=mousedrag.body.density*10000; // 密度
  document.forms.myform.elements[5].value=mousedrag.body.restitution * 100; // 反発
  document.forms.myform.elements[6].value=mousedrag.body.render.fillStyle;
  document.forms.myform.elements[7].value=mousedrag.body.isStatic;
  prevClickObj = mousedrag.body.id - 1; //id は1-based index
  if(e.body.label == "ne") {
    console.log(e);
  }
});

$(document).on('click', '#addTri', function () {
  addTriangle(width/2,height/2,null,standardRad);

});
$(document).on('click', '#addCircle', function () {
  addCircle(width/2,height/2,null,standardRad);
});
$(document).on('click', '#addConstraint', function () {
  World.add(engine.world,
    Matter.Constraint.create({
      bodyA:objects[4],
      bodyB:objects[5],
      isStatic:true,
    })
  )
});
// 
$(document).on('click', '#addRec', function () {
  addRectangle(350, 250, null,standardSide, standardSide);
});
// 棒
$(document).on('click', '#addBar', function () {
  addBar(350,250,null,standardSide*4);
});

function clickForm(){
  var Elements = document.forms.myform.elements;
  var data1,data2;
  if(document.forms.myform.key == 'add'){
    switch(Elements[0].value){
      case 'Circle Body':
        data1 = Elements[3].value/50*standardRad;  //toDO sizeの調整
        break;
      case 'Rectangle Body':
        data1 = data2 = Elements[3].value/50*standardSide;
        break;
      case 'Triangle Body':
        data1 = Elements[3].value/50*standardRad;
        break;
      case 'Bar Body':
        data1 = Elements[3].value/50*standardSide*4;
        break;
    }
    var obj = createObjct(Elements[0].value,Number(Elements[1].value),Number(Elements[2].value),
                  Elements[6].value,Elements[7].checked,
                  0,Elements[4].value/10000,Elements[5].value/100,data1,data2);
                  //type,x,y,color,isStatic,angle,density,restitution,data1,data2
  }
  else {
    Matter.Body.setStatic(objects[prevClickObj],Elements[7].checked)
  }
};


//開始はlib.js

//保存
$(document).on('click', '#save', function () {
  
  var data = [];
  for (let i = 1; i<objects.length;i++) { //mouseがobjects[0]
    var data1=0,data2=0,data3=0;
    if (objects[i].label === "Circle Body") {
      data1 = objects[i].circleRadius;
    }
    else if (objects[i].label === "Rectangle Body" || objects[i].label === "Bar Body") {
      data1 = objects[i].bounds.max.x - objects[i].bounds.min.x;
      data2 = objects[i].bounds.max.y - objects[i].bounds.min.y;
    }
    else if (objects[i].label === "Triangle Body"){
      data1 = objects[i].rad;
    }
    let tmp = {
      "type": objects[i].label,
      "x": roundFloat(objects[i].position.x,4),
      "y": roundFloat(objects[i].position.y,4),
      "color": objects[i].render.fillStyle,
      "isStatic": objects[i].isStatic,
      "angle":roundFloat(objects[i].angle,3),
      "density":roundFloat(objects[i].density,3),
      "restitution":roundFloat(objects[i].restitution,4),
      "data1": roundFloat(data1,2),
      "data2": roundFloat(data2,2)
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
