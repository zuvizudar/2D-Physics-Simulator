import Matter from "matter-js"

export function createObjct(label, x, y, color, isStatic, angle, density, restitution, data1, data2, scale) {
    //scaleでの実装ならdata1,data2要らないかも、、
    var obj;
    if (label === "Circle Body") {
        obj = createCircle(x, y, color, data1);
    }
    else if (label === "Rectangle Body") {
        obj = createRectangle(x, y, color, data1, data2);
    }
    else if (label === "Square Body") {
        obj = createSquare(x, y, color, data1);
    }
    else if (label === "Triangle Body") {
        obj = createTriangle(x, y, color, data1);
    }
    else if (label === "Bar Body") {
        obj = createBar(x, y, color, data1);
    }

    Matter.Body.setDensity(obj, density);
    //Matter.Body.setStatic(obj, isStatic);
    obj.isStatic = isStatic;
    Matter.Body.setAngle(obj, angle);
    obj.restitution = restitution;
    obj.scale = scale; 

    return obj;
}

function createCircle(x, y, color, rad) {

    var ball = Matter.Bodies.circle(x, y, rad, {
        render: {
            fillStyle: color,
        }
    });
    ball.friction = 0;
    
    return ball;
}

function createRectangle(x, y, color, width, height) {
    let rectangle = Matter.Bodies.rectangle(x, y, width, height, {
        render: {
            fillStyle: color
        }
    });

    return rectangle;
}
function createSquare(x, y, color, length) {
    var square = createRectangle(x, y, color, length, length);
    square.label = "Square Body"
    return square;
}
function createBar(x, y, color, length) {
    var bar = createRectangle(x, y, color, length, length/20);
    bar.label = "Bar Body"
    return bar;
}
function createPolygon(x, y, color, sides, rad) {
    var polygon = Matter.Bodies.polygon(x, y, sides, rad, {
        render: {
            fillStyle: color
        }
    })
    polygon.rad = rad;
    return polygon;
}
function createTriangle(x, y, color, rad) {
    var triangle = createPolygon(x, y, color, 3, rad);
    triangle.label = "Triangle Body";
    return triangle;
}

/*
function createStack(numX, numY) {
    var stackA = Composites.stack(100, 100, numX, numY, 0, 0, function (x, y) {
        return Matter.Bodies.rectangle(x, y, 15, 15);
    });
    World.add(engine.world, stackA);
    console.log(stackA)
    stackA.Matter.Bodies.map((c) => {
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
    objects[0] = createCircle(10,10,0,10);  //error対策で、実際描画しない.選択を外す時に使う
  
    createObjct("Rectangle Body",width / 2, height, '#2e2b44',true,0,0.005,0, width, 60,1)
    createObjct("Rectangle Body",0, height/2, '#2e2b44',true,0,0.005,0, 60,height,1)
    createObjct("Rectangle Body",width , height/2, '#2e2b44',true,0,0.005,0, 60,height,1)
}

function createBallPyramid(){
    for(var i = 0 ; i < 9; i++){
        for(var j = 0; j <= i; j++){
          var x = (width/2 - i*35) + j*70;
          var y = 50+i*50;
          createObjct("Circle Body", x, y, 'gray', true, 0, 0.001, 0, 10, 0, 1);
        }
      }
}*/