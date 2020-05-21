/*// module aliases
var Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Vertices = Matter.Vertices,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    engine, world;

var shapes = [];
var preTime = 0;
var canvas;
var mConstrains;

var grid = {
    rows: 10,
    cols : 15,
    spacing: 35,
    sizeDot: 5
};
var gateBottom;

function addMouseControl() {
    // mouse constrains
    var canvasmouse = Mouse.create(canvas.elt);
    canvasmouse.pixelRatio = pixelDensity();
    var options = {
        mouse: canvasmouse
    }

    mConstrains = MouseConstraint.create(engine, options);
    World.add(world, mConstrains);
}

function addGrid() {
    shapes = makeGrid(width / 2, height / 3, grid.rows, grid.cols, grid.sizeDot, grid.spacing);
    for (var dot of shapes) {
        dot.addToWorld(world);
    }
    addGround();
}

function autoAddShapes() {
    setInterval(function () {
        if (focused) {
            newShape(width / 2 + random(-4 * grid.spacing, 4 * grid.spacing), 0);
        }
    }, 300);
}

function autoReleaseGate() {
    setInterval(function(){
        releaseGround();
        setTimeout(function() {
            addGround();
        }, 3000);
    }, 30000);
}

function setupWorld() {
    engine = Engine.create();
    world = engine.world;
    Engine.run(engine);
}

function newShape(x, y) {
    var options = {
        friction: 0.001,
        restitution: 0.6
    };
    var obj;
    if (random(1) > .5)
        obj = new Circle(x, y, 10, options);
    else obj = new Box(x, y, random(10, 20), random(10, 20), options)
    obj.addToWorld(world);
    shapes.push(obj);
}

function makeGrid(posx, posy, rows, cols, sizeDot, spacing) {
    var result = [];

    // dots
    for (var i = 0; i < rows; i++) {
        var y = (posy - rows * spacing / 2) + i * spacing + spacing / 2;

        for (var j = 0; j < cols; j++) {
            var x = (posx - cols * spacing / 2) + j * spacing + spacing / 2;
            if (i % 2) {
                x += spacing / 2;
            }
            result.push(new Circle(x, y, sizeDot, {
                isStatic: true
            }));
        }
    }

    for (var i = 0; i <= cols; i++) {
        result.push(new Box(posx - cols / 2 * spacing + i * spacing, height - 80, 5, 150, {
            isStatic: true
        }));
    }

    return result;
}

function addGround() {
    // grounds
    if(gateBottom) {
        gateBottom.removeFrom(shapes, world);
    }
    gateBottom = new Box(width / 2, height, width, 20, {
        isStatic: true
    });
    gateBottom.addToWorld(world);
    shapes.push(gateBottom)
}

function releaseGround() {
    gateBottom.body.isStatic = false;
}

// ============= BEGIN P5JS ===============
function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    rectMode(CENTER);

    setupWorld();
    addMouseControl();
    addGrid();
    autoAddShapes();
    autoReleaseGate();
}

function draw() {
    background(30);

    fill(120);
    noStroke();
    textSize(16);
    text('SpaceBar - add shapes\nMouse - drag shapes.', 5, 20)

    for (var i = shapes.length - 1; i >= 0; i--) {
        shapes[i].show();
        if (shapes[i].isOffScreen()) shapes[i].removeFrom(shapes, world);
    }

    // drag shapes
    if (mConstrains.body) {
        var pos = mConstrains.body.position;
        var offset = mConstrains.constraint.pointB;
        var m = mConstrains.mouse.position;
        stroke(0, 255, 0);
        line(pos.x + offset.x, pos.y + offset.y, m.x, m.y);
    }

    // add shapes with SpaceBar
    if (keyIsDown(32)) {
        if (millis() - preTime > 20) {
            preSpaw = millis();
            newShape(mouseX, mouseY);
        }
    }
}

// ===== Classes =======
class Shape2D {
    constructor(x, y, vertices, option) {
        if (x && y && vertices) {
            this.body = Bodies.fromVertices(x, y, vertices, option);
        }
    }

    addToWorld(world) {
        World.add(world, this.body);
    }

    isOffScreen() {
        return this.body.position.x < -200 || this.body.position.x > width + 200 ||
            this.body.position.y < -200 || this.body.position.y > height + 200
    }

    removeFrom(arr, world) {
        World.remove(world, this.body);
        arr.splice(arr.indexOf(this), 1);
    }

    calColor() {
        if (this.body.isStatic) {
            fill(65);
        } else {
            fill(this.col);
        }
        noStroke();
    }
}

class Box extends Shape2D {
    constructor(x, y, w, h, option) {
        super();
        this.body = Bodies.rectangle(x, y, w, h, option);
        this.col = [random(255), random(255), random(255)];
    }

    show() {
        this.calColor();

        beginShape();
        for (var p of this.body.vertices) {
            vertex(p.x, p.y);
        }
        endShape(CLOSE);
    }
}

class Circle extends Shape2D {
    constructor(x, y, r, option) {
        super();
        this.body = Bodies.circle(x, y, r, option);
        this.col = [random(255), random(255), random(255)];
    }

    show() {
        push();
        translate(this.body.position.x, this.body.position.y);
        rotate(this.body.angle);

        this.calColor();
        ellipse(0, 0, this.body.circleRadius * 2);

        // direction of ball
        if (!this.body.isStatic) {
            stroke(200);
            strokeWeight(2);
            line(0, 0, this.body.circleRadius - 2, 0);
        }
        pop();
    }
}*/