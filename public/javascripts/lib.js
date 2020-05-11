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

function addCircle(x, y, color, rad) {

    var ball = Bodies.circle(x, y, rad, {
        render: {
            fillStyle: color
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
        obj.collisionFilter.group = 1;
        obj.frictionAir = 0.01;
    }
    Matter.Body.setDensity(obj, density);
    Matter.Body.setStatic(obj, isStatic);
    Matter.Body.setAngle(obj, angle);
    obj.restitution = restitution;
    obj.scale = scale; 

    prev2.id = prev1.id;
    prev1.id = obj.id;
    
    World.add(engine.world, obj);
    objects[obj.id]=obj;
    return obj;
}
function addConstraint(id1,id2,x1,y1,x2,y2){
    var constraint =Matter.Constraint.create({
        bodyA: objects[id1],
        pointA:{x:x1,y:y1},
        bodyB: objects[id2],
        pointB:{x:x2,y:y2},
        stiffness:1,
        angularStiffness:1    
      })

      World.add(engine.world,constraint);
      objects[constraint.id] = constraint;
}
function attachFilter(obj) { //マウスのみ接触するフィルター
    obj.collisionFilter = {
        'group': 0,
        'category': 2,
        'mask': 1,
    }
    obj.frictionAir = 1; //動かないように
}

function reduce_friction(obj, rate) {
    obj.restitution = 1 - 1 * rate;
}

$(document).on('click', '#start', function () {
    for (let i in objects) {
        if (objects[i] === undefined||objects[i].label==="Constraint") continue;
        objects[i].collisionFilter.group = 1;
        objects[i].frictionAir = 0.01;
    }
    engine.world.gravity.y = 1
});

$(document).on('click', '#stop', function () {

    for (let i in objects) {
        if (objects[i] === undefined) continue;
        attachFilter(objects[i]);
    }
    engine.world.gravity.y = 0;
});

function roundFloat(number, n) {
    var _pow = Math.pow(10, n);
    return Math.round(number * _pow) / _pow;
}