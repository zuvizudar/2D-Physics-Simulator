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