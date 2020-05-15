//初期オブジェクト
/*var circleA = Bodies.circle(450, 50, 30, {
  render: {
    fillStyle: 'red'
  },
  inertia:Infinity
});*/

var click_screenOnly_flag = 1;
Events.on(mousedrag, "mousedown", function (e) { //touchした座標をcontrolに反映
  document.forms.controlForm.elements[1].value = Math.floor(e.mouse.position.x);
  document.forms.controlForm.elements[2].value = Math.floor(e.mouse.position.y);
  if (click_screenOnly_flag) {
    prev1.id = 0;
  }
  click_screenOnly_flag = 1;
})

Events.on(mousedrag, "startdrag", function (e) {   // dragしたobjをcontrolに反映
  var Elements = document.forms.controlForm.elements;
  Elements[0].value = e.body.label;
  Elements[3].value = e.body.angle * 100;
  Elements[4].value = e.body.scale * 100;
  Elements[5].value = e.body.density * 10000; // 密度
  Elements[6].value = e.body.restitution * 100; // 反発
  Elements[7].value = e.body.render.fillStyle;
  Elements[8].checked = e.body.isStatic;

  prev2.id = prev1.id;
  prev1.id = e.body.id;
  prev2.offset.x = prev1.offset.x;
  prev2.offset.y = prev1.offset.y;
  prev1.offset.x = e.mouse.mousedownPosition.x - e.body.position.x;
  prev1.offset.y = e.mouse.mousedownPosition.y - e.body.position.y;

  click_screenOnly_flag = 0;
  if (e.body.label == "ne") {
    console.log(e);
  }
});

function changeControl_Angle() {
  Matter.Body.setAngle(objects[prev1.id],
    document.forms.controlForm.elements[3].value / 100);
}
function changeControl_Size() {
  var obj = objects[prev1.id];
  var nextScale = document.forms.controlForm.elements[4].value / 100;

  Matter.Body.scale(obj, 1 / obj.scale, 1 / obj.scale); //一回scale=1に戻す
  Matter.Body.scale(obj, nextScale, nextScale);
  switch (obj.label) {
    case 'Circle Body':
      //obj.circleRadius*=nextScale; //scaleでやってくれる
      break;
    case 'Square Body':
    case 'Bar Body':
      //obj.width*=nextScale;
      //obj.height*=nextScale;
      break;
    case 'Triangle Body':
      obj.rad *= nextScale;
      break;
  }
  obj.scale = nextScale;
}
function changeControl_Density() {
  Matter.Body.setDensity(objects[prev1.id],
    document.forms.controlForm.elements[5].value / 10000);
}
function changeControl_Restitution() {
  objects[prev1.id].restitution = document.forms.controlForm.elements[6].value / 100
}
function changeControl_Color() {
  objects[prev1.id].render.fillStyle = document.forms.controlForm.elements[7].value;
}
function changeControl_Static() {
  // Matter.Body.setStatic(objects[prev1.id], 
  //               document.forms.controlForm.elements[8].checked);
  objects[prev1.id].isStatic = document.forms.controlForm.elements[8].checked;
}

$(document).on('click', '#addTri', function () {
  document.forms.controlForm.elements[0].value = "Triangle Body";
  control2obj();
});
$(document).on('click', '#addCircle', function () {
  document.forms.controlForm.elements[0].value = "Circle Body";
  control2obj();
});
$(document).on('click', '#addConstraint', function () {
  if (prev1.id > 0 && prev2.id > 0 && prev1.id != prev2.id) {
    addConstraint(prev1.id, prev2.id,
      prev1.offset.x, prev1.offset.y, prev2.offset.x, prev2.offset.y);
  }
});
// 
$(document).on('click', '#addSquare', function () {
  //document.forms.controlForm.elements[0].value = "Square Body";
  //control2obj();
  zoom*=0.9;
});
// 棒
var myHero;
$(document).on('click', '#addBar', function () {
  document.forms.controlForm.elements[0].value = "Circle Body";
  myHero =new Hero(control2obj());
  funcArray.push(myHero.cameraMove)
  //addIntervalObject();
  //addCar();
});
class Hero{
  constructor(obj){
    this.obj = obj;
    this.obj.type = "Hero"
  }
  cameraMove(){

    render.bounds.min.x= this.obj.position.x- width/2*scale;
    render.bounds.max.x= this.obj.position.x+ width/2*scale;
    render.bounds.min.y= this.obj.position.y-height/2*scale;
    render.bounds.max.y= this.obj.position.y+height/2*scale;
  }
  objMove(){
    var speed = 7;
    if(keys[65]){
      if(isRunning){
        //Matter.Body.setVelocity(this.obj, {x: -speed, y: this.obj.velocity.y})
        Matter.Body.applyForce(this.obj,this.obj.position,{x: -0.01, y: 0})
      }
    }
    if(keys[68]){
      if(isRunning){
        //Matter.Body.setVelocity(this.obj, {x: speed, y: this.obj.velocity.y})
        Matter.Body.applyForce(this.obj,this.obj.position,{x: 0.01, y: 0})
      }
    }
    if(keys[87]){
      if(isRunning){
        if(heroCanJump){
          Matter.Body.setVelocity(this.obj, {x: this.obj.velocity.x, y: -speed})
          //Matter.Body.applyForce(this.obj,this.obj.position,{x: 0, y: -0.3})
          heroCanJump=false;
        }
        keys[87] = false;
      }
    }
    if(keys[82]){
      scale*=1.01;
    }
    if(keys[84]){
      scale/=1.01;
    }
  }
}
var keys=[]
var funcArray =[];
var heroCanJump = true;
function myloop(){
  if(myHero){
    myHero.cameraMove();
    myHero.objMove();
  }
}
document.body.addEventListener("keydown", function(e){ 
  keys[e.keyCode]=true;
})
document.body.addEventListener("keyup", function(e){ 
  keys[e.keyCode]=false;
})


Events.on(engine, 'collisionStart', function(event) {
  var pairs = event.pairs;
  for(let i in pairs){
    if(pairs[i].bodyA.type == "Hero" ||pairs[i].bodyB.type == "Hero" ){
      heroCanJump = true;
    }
  }
});
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
$(document).on('click', '#Delete', function () {
  Matter.World.remove(engine.world, objects[prev1.id]);
  objects[prev1.id] = undefined
});

function Control_Size2data(type, rangeValue) { //[50,200] TODO: 調整
  var data1, data2;
  switch (type) {
    case 'Circle Body':
      data1 = standardRad * rangeValue / 100;
      break;
    case 'Square Body':
      data1 = data2 = rangeValue / 100 * standardSide;
      break;
    case 'Triangle Body':
      data1 = rangeValue / 100 * standardRad;
      break;
    case 'Bar Body':
      data1 = rangeValue / 100 * standardSide * 2;
      break;
  }
  return { data1, data2 };
}

function obj2data(obj) {//dataは(width,height) or (rad,null)とか
  var data1, data2;
  switch (obj.label) {
    case 'Circle Body':
      data1 = obj.circleRadius;
      break;
    case 'Rectangle Body':
    case 'Square Body':
    case 'Bar Body':
      //data1 = obj.width;
      //data2 = obj.height;
      data1 = getDis(obj.vertices[0], obj.vertices[1]);
      data2 = getDis(obj.vertices[0], obj.vertices[3]);
      break;
    case 'Triangle Body':
      data1 = obj.rad;
      break;
    default:
      data1 = -1;
  }
  return { data1, data2 };
}
function getDis(obj1, obj2) {
  return Math.sqrt(Math.pow(obj2.x - obj1.x, 2) + Math.pow(obj2.y - obj1.y, 2));
}
function control2obj() {
  var Elements = document.forms.controlForm.elements;
  var { data1, data2 } = Control_Size2data(Elements[0].value, Elements[4].value);
  var obj = createObjct(Elements[0].value, Number(Elements[1].value), Number(Elements[2].value),
    Elements[7].value, Elements[8].checked,
    Elements[3].value / 100, Elements[5].value / 10000, Elements[6].value / 100,
    data1, data2, Elements[4].value / 100);
  //type,x,y,color,isStatic,angle,density,restitution,data1,data2,scale
  return obj;
};


//保存
//var hostURL = "https://two-sim.herokuapp.com";
var hostURL = "http://localhost:8000";
$(document).on('click', '#save', function () {

  var sceneInfo = [], data = [], nextIdMap = [], nextIdCnt = 2;
  for (var i = 0; i < 4; i++) {
    var c = document.forms.saveForm.elements[i];
    if (i === 3)
      sceneInfo.push(c.checked);
    else
      sceneInfo.push(c.value);
  }
  for (let i = 1; i < objects.length; i++) {
    if (objects[i] === undefined) {
      continue;
    }
    if (objects[i].label === "Constraint") {
      var tmp = {
        "type": objects[i].label,
        "x": nextIdMap[objects[i].bodyA.id],
        "y": nextIdMap[objects[i].bodyB.id],
        "color": "white",
        "isStatic": true,
        "angle": roundFloat(objects[i].pointA.x, 4),
        "density": roundFloat(objects[i].pointA.y, 4),
        "restitution": roundFloat(objects[i].pointB.x, 4),
        "data1": roundFloat(objects[i].pointB.y, 4),
        "data2": 0
      }
    }
    else {
      if (chechObjectRange(objects[i])) //TODO 片方消えた時のconstraint
        continue;
      var { data1, data2 } = obj2data(objects[i]);
      if (data1 === -1) continue;
      var tmp = {
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
      nextIdMap[objects[i].id] = nextIdCnt;
    }
    data.push(tmp);
    nextIdCnt++;
  }
  var hostUrl = hostURL + "/making/save";

  $.ajax({
    url: hostUrl,
    type: "POST",
    data: { "data": data, "sceneInfo": sceneInfo },
    dataType: "text",
    scriptCharset: "utf-8",
    timeout: 3000
  }
  ).then(
    (data) => {
      console.log("ok")
      window.location.href = hostURL + "/scenes/" + data;
    },
    (XMLHttpRequest, textStatus, errorThrown) => {
      console.log("error");
      console.log("XMLHttpRequest : " + XMLHttpRequest.status);
      console.log("textStatus     : " + textStatus);
      console.log("errorThrown    : " + errorThrown.message);
    }
  )
});

function chechObjectRange(obj) {
  const x = obj.position.x,
    y = obj.position.y;
  if (x < 0 || x > width || y < 0 || y > height)
    return 1;
  else return 0;
}

function addLib(sceneId) {
  var hostUrl = hostURL + "/addLibrary/" + sceneId;

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
      var tmp = idCnt - 1;
      data.objects.map((c) => {
        if (c.ObjectType === "Constraint") {
          addConstraint(c.X + tmp, c.Y + tmp, c.Angle, c.Density, c.Restitution, c.Data1);
        } else {
          createObjct(c.ObjectType, c.X, c.Y, c.Color,
            c.isStatic, c.Angle, c.Density, c.Restitution, c.Data1, c.Data2, 1);
        }
      })
    },
    (XMLHttpRequest, textStatus, errorThrown) => {
      console.log("error");
      console.log("XMLHttpRequest : " + XMLHttpRequest.status);
      console.log("textStatus     : " + textStatus);
      console.log("errorThrown    : " + errorThrown.message);
    }
  )
}