function addStack(numX, numY) {
    var stackA = Composites.stack(100, 100, numX, numY, 0, 0, function (x, y) {
        return Bodies.rectangle(x, y, 15, 15);
    });
    World.add(engine.world, stackA);
    console.log(stackA)
    stackA.bodies.map((c) => {
        objects[c.id]=c;
    })
}
function addFuriko(){
    var rec = createObjct("Rectangle Body",width/2,50,null,true,0,0.001,0,20,20,1);
    var cir = createObjct("Circle Body",width/2,300,null,false,0,0.001,1,50,20,1);
    var constraint = Matter.Constraint.create({
      bodyA:rec,
      bodyB:cir,
      stiffness:1
    })
    World.add(engine.world,constraint);
    objects[constraint.id] = constraint;
}

function fieldInit() {
    objects[0] = addCircle(10,10,0,10);  //error対策で、実際描画しない.選択を外す時に使う
  
    createObjct("Rectangle Body",width / 2, height, '#2e2b44',true,0,0.005,0, width, 60,1)
    createObjct("Rectangle Body",0, height/2, '#2e2b44',true,0,0.005,0, 60,height,1)
    createObjct("Rectangle Body",width , height/2, '#2e2b44',true,0,0.005,0, 60,height,1)
}

function addBallPyramid(){
    for(var i = 0 ; i < 9; i++){
        for(var j = 0; j <= i; j++){
          var x = (width/2 - i*35) + j*70;
          var y = 50+i*50;
          createObjct("Circle Body", x, y, 'gray', true, 0, 0.001, 0, 10, 0, 1);
        }
      }
}

function addCircle(x, y, color, rad) {

    var ball = Bodies.circle(x, y, rad, {
        render: {
            fillStyle: color,
        }
    });
    ball.friction = 0;
    
    return ball;
}

function addRectangle(x, y, color, width, height) {
    let rectangle = Bodies.rectangle(x, y, width, height, {
        render: {
            fillStyle: color
        }
    });

    return rectangle;
}
function addSquare(x, y, color, length) {
    var square = addRectangle(x, y, color, length, length);
    square.label = "Square Body"
    return square;
}
function addBar(x, y, color, length) {
    var bar = addRectangle(x, y, color, length, length/20);
    bar.label = "Bar Body"
    return bar;
}
function addPolygon(x, y, color, sides, rad) {
    var polygon = Bodies.polygon(x, y, sides, rad, {
        render: {
            fillStyle: color
        }
    })

    polygon.rad = rad;
    return polygon;
}
function addTriangle(x, y, color, rad) {
    var triangle = addPolygon(x, y, color, 3, rad);
    triangle.label = "Triangle Body";
    return triangle;
}

function createObjct(type, x, y, color, isStatic, angle, density, restitution, data1, data2, scale) {
    //scaleでの実装ならdata1,data2要らないかも、、
    var obj;
    if (type === "Circle Body") {
        obj = addCircle(x, y, color, data1);
    }
    else if (type === "Rectangle Body") {
        obj = addRectangle(x, y, color, data1, data2);
    }
    else if (type === "Square Body") {
        obj = addSquare(x, y, color, data1);
    }
    else if (type === "Triangle Body") {
        obj = addTriangle(x, y, color, data1);
    }
    else if (type === "Bar Body") {
        obj = addBar(x, y, color, data1);
    }

    if (engine.world.gravity.y == 0) {//開始前、マウスのみ接触
        attachFilter(obj);
    }else{
        obj.frictionAir = 0;
    }
    Matter.Body.setDensity(obj, density);
    //Matter.Body.setStatic(obj, isStatic);
    obj.isStatic = isStatic;
    Matter.Body.setAngle(obj, angle);
    obj.restitution = restitution;
    obj.scale = scale; 

    prev2.id = prev1.id;
    prev1.id = obj.id;

    World.add(engine.world, obj);
    objects[obj.id]=obj;
    idCnt = obj.id;
    return obj;
}

function addConstraint(id1,id2,x1,y1,x2,y2){
    var constraint =Matter.Constraint.create({
        bodyA: objects[id1],
        pointA:{x:x1,y:y1},
        bodyB: objects[id2],
        pointB:{x:x2,y:y2},
        stiffness:1,

      })
      var group = Math.min(objects[id1].collisionFilter.group,objects[id2].collisionFilter.group);
      if(group >= 0)
        var group = Matter.Body.nextGroup(true);

      objects[id1].collisionFilter.group=group;
      objects[id2].collisionFilter.group=group;

      World.add(engine.world,constraint);
      objects[constraint.id] = constraint;
      idCnt = constraint.id;
}
function attachFilter(obj) { //マウスのみ接触するフィルター
    obj.collisionFilter.category=2;
    obj.collisionFilter.mask=1;

    obj.frictionAir = 1; //動かないように
}

function reduce_friction(obj, rate) {
    obj.restitution = 1 - 1 * rate;
}

$(document).on('click', '#start', function () {
    for (let i in objects) {
        if (objects[i] === undefined||objects[i].label==="Constraint") continue;
        objects[i].collisionFilter.category=4294967295;
        objects[i].collisionFilter.mask=4294967295;
        objects[i].frictionAir = 0;
    }
    engine.world.gravity.y = 1
});

$(document).on('click', '#stop', function () {

    for (let i in objects) {
        if (objects[i] === undefined||objects[i].label==="Constraint") continue;
        attachFilter(objects[i]);
    }
    engine.world.gravity.y = 0;
});

function roundFloat(number, n) {
    var _pow = Math.pow(10, n);
    return Math.round(number * _pow) / _pow;
}