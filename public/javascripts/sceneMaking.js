//初期オブジェクト
/*var circleA = Bodies.circle(450, 50, 30, {
  render: {
    fillStyle: 'red'
  },
  inertia:Infinity
});*/

fieldInit();
function fieldInit() {
  createObjct("Rectangle Body",width / 2, height, '#2e2b44',true,0,0.005,0, width, 60,1)
  createObjct("Rectangle Body",0, height/2, '#2e2b44',true,0,0.005,0, 60,height,1)
  createObjct("Rectangle Body",width , height/2, '#2e2b44',true,0,0.005,0, 60,height,1)

  objects[0] = addCircle(10,10,0,10);  //error対策で、実際描画しない.選択を外す時に使う
}
var click_screenOnly_flag=1;
Events.on(mousedrag, "mousedown", function (e) { //touchした座標をcontrolに反映
  document.forms.myform.elements[1].value = Math.floor(e.mouse.position.x);
  document.forms.myform.elements[2].value = Math.floor(e.mouse.position.y);
  if(click_screenOnly_flag){
    prev1.id = 0;
  }
  click_screenOnly_flag =1;
})

Events.on(mousedrag, "startdrag", function (e) {   // dragしたobjをcontrolに反映
  var Elements = document.forms.myform.elements;
  Elements[0].value = mousedrag.body.label;
  Elements[3].value = mousedrag.body.angle * 100; 
  Elements[4].value = mousedrag.body.scale*100; 
  Elements[5].value = mousedrag.body.density * 10000; // 密度
  Elements[6].value = mousedrag.body.restitution * 100; // 反発
  Elements[7].value = mousedrag.body.render.fillStyle;
  Elements[8].checked = mousedrag.body.isStatic;

  prev2.id = prev1.id;
  prev1.id = mousedrag.body.id ; 
  prev2.offset.x = prev1.offset.x;
  prev2.offset.y = prev1.offset.y;
  prev1.offset.x=e.mouse.mousedownPosition.x - e.body.position.x;
  prev1.offset.y=e.mouse.mousedownPosition.y - e.body.position.y;
  
  click_screenOnly_flag = 0;
  if (e.body.label == "ne") {
    console.log(e);
  }
});

function changeControl_Angle() {
  Matter.Body.setAngle(objects[prev1.id], 
                  document.forms.myform.elements[3].value / 100);
}
function changeControl_Size() {
  var obj = objects[prev1.id];
  var nextScale = document.forms.myform.elements[4].value / 100;

  Matter.Body.scale(obj,1/obj.scale,1/obj.scale); //一回scale=1に戻す
  Matter.Body.scale(obj, nextScale,nextScale);
  switch (obj.label) {
    case 'Circle Body':
      //obj.circleRadius*=nextScale; //scaleでやってくれる
      break;
    case 'Square Body':
    case 'Bar Body':
      obj.width*=nextScale;
      obj.height*=nextScale;
      break;
    case 'Triangle Body':
      obj.rad*=nextScale;
      break;
  }
  obj.scale=nextScale;
}
function changeControl_Density() {
  Matter.Body.setDensity(objects[prev1.id], 
                  document.forms.myform.elements[5].value / 10000);
}
function changeControl_Restitution() {
  objects[prev1.id].restitution = document.forms.myform.elements[6].value/100
}
function changeControl_Color() {
  objects[prev1.id].render.fillStyle = document.forms.myform.elements[7].value;
}
function changeControl_Static() {
  Matter.Body.setStatic(objects[prev1.id], 
                  document.forms.myform.elements[8].checked);
}

$(document).on('click', '#addTri', function () {
  document.forms.myform.elements[0].value = "Triangle Body";
  control2obj();
});
$(document).on('click', '#addCircle', function () {
  document.forms.myform.elements[0].value = "Circle Body";
  control2obj();
});
$(document).on('click', '#addConstraint', function () {

  var constraint =Matter.Constraint.create({
    bodyA: objects[prev1.id],
    pointA:{x:prev1.offset.x,y:prev1.offset.y},
    bodyB: objects[prev2.id],
    pointB:{x:prev2.offset.x,y:prev2.offset.y},
    stiffness:1,
    angularStiffness:1    
  })
  console.log(constraint);
  World.add(engine.world,constraint);
});
// 
$(document).on('click', '#addSquare', function () {
  document.forms.myform.elements[0].value = "Square Body";
  control2obj();
});
// 棒
$(document).on('click', '#addBar', function () {
  document.forms.myform.elements[0].value = "Bar Body";
  control2obj();
});
$(document).on('click', '#Delete', function () {
  Matter.World.remove(engine.world,objects[prev1.id]);
  objects[prev1.id] = "undefined"
});

function Control_Size2data(type,rangeValue){ //[50,200] TODO: 調整
  var data1,data2;
  switch (type) {
    case 'Circle Body':
      data1 =  standardRad*rangeValue/100;
      break;
    case 'Square Body':
      data1 = data2 = rangeValue / 100 * standardSide;
      break;
    case 'Triangle Body':
      data1 = rangeValue / 100 * standardRad;
      break;
    case 'Bar Body':
      data1 = rangeValue / 100 * standardSide*2 ;
      break;
  }
  return {data1,data2};
}

function obj2data(obj){//dataは(width,height) or (rad,null)とか
  var data1,data2;
  switch (obj.label) {
    case 'Circle Body':
      data1 = obj.circleRadius;
      break;
    case 'Rectangle Body':
    case 'Square Body':
    case 'Bar Body':
      data1 = obj.width;
      data2 = obj.height;
      break;
    case 'Triangle Body':
      data1 = obj.rad;
      break;
  }
  return {data1,data2};
}

function control2obj() {
  var Elements = document.forms.myform.elements;
  var {data1, data2} = Control_Size2data(Elements[0].value,Elements[4].value);
  var obj = createObjct(Elements[0].value, Number(Elements[1].value), Number(Elements[2].value),
    Elements[7].value, Elements[8].checked,
    Elements[3].value / 100, Elements[5].value / 10000, Elements[6].value / 100, 
      data1, data2,Elements[4].value/100);
  //type,x,y,color,isStatic,angle,density,restitution,data1,data2
};


//保存
$(document).on('click', '#save', function () {

  var data = [];
  for (let i = 1 ; i<objects.length;i++) {
    if(objects[i] === undefined ) {
      continue;
    }
    var {data1,data2} = obj2data(objects[i]);
    let tmp = {
      "type": objects[i].label,
      "x": roundFloat(objects[i].position.x, 4),
      "y": roundFloat(objects[i].position.y, 4),
      "color": objects[i].render.fillStyle,
      "isStatic": objects[i].isStatic,
      "angle": roundFloat(objects[i].angle, 3),
      "density": roundFloat(objects[i].density, 3),
      "restitution": roundFloat(objects[i].restitution, 4),
      "data1": roundFloat(data1, 2),
      "data2": roundFloat(data2, 2)
    }
    data.push(tmp);
  }

  var hostUrl = "http://localhost:8000/making/save";

  $.ajax({
    url: hostUrl,
    type: "POST",
    data: { "data": data },
    dataType: "text",
    scriptCharset: "utf-8",
    timeout: 3000
  }
  ).then(
    (data) => {
      console.log("ok")
      window.location.href = "http://localhost:8000/scenes/" + data;
    },
    (XMLHttpRequest, textStatus, errorThrown) => {
      console.log("error");
      console.log("XMLHttpRequest : " + XMLHttpRequest.status);
      console.log("textStatus     : " + textStatus);
      console.log("errorThrown    : " + errorThrown.message);
    }
  )
});
