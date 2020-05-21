import Matter from "matter-js"

export {Player ,Object,Circle,Rectangle, Square, Triangle,Bar};

class Object {
    setStatic(isStatic) {
        this.body.isStatic = isStatic;
    }
    addToWorld(main) {
        if (main.scene.engine.world.gravity.y === 0) {//開始前、マウスのみ接触
            this.attachFilter_Mouse();
        }
        else {
            this.attachFilter_All();
            this.body.frictionAir = 0;
        }
        main.mouse.prev2.id = main.mouse.prev1.id;
        main.mouse.prev1.id = this.body.id;

        main.objects[this.body.id] = this;
        main.scene.idCnt = this.body.id; //最後のidをメモ
        Matter.World.add(main.scene.engine.world, this.body);
    }
    removeFrom(main) {
        Matter.World.remove(main.scene.engine.world, this.body);
        main.objects[this.body.id] = undefined;
    }
    attachFilter_Mouse() { //マウスのみ接触するフィルター
        this.body.collisionFilter.category=2;
        this.body.collisionFilter.mask=1;
    
        this.body.frictionAir = 1; //動かないように
    }
    attachFilter_All(){
        this.body.collisionFilter.category=4294967295;
        this.body.collisionFilter.mask=4294967295;
    }
}
class Player extends Object{
    constructor() {
        super();
        this.exist = false;
    }
    init(x,y) {
        const rad = 35; //pngに合わせる
        const options={
            density:0.001,
            density: 0.001,
            //friction:0,
            //frictionAir:0,
            restitution: 0.3,
            render: {
              sprite: { //スプライトの設定
                texture: '../img/rainboww.png' //テクスチャ画像を指定
              }
            },
            scale:1
        }
        this.body = Matter.Bodies.circle(x,y,rad,options);
        this.body.isPlayer = "Player"
        this.canJump = true;
        this.speed = 7;
        this.exist = true;
    }
    moveRight() {
        //Matter.Body.applyForce(this.body, this.body.position, { x: 0.01, y: 0 })
        Matter.Body.setVelocity(this.body, {x: this.speed*2, y: this.body.velocity.y})
    }
    moveLeft() {
        //Matter.Body.applyForce(this.body, this.body.position, { x: -0.01, y: 0 })
        Matter.Body.setVelocity(this.body, {x: -this.speed*2, y: this.body.velocity.y})
    }
    moveUp() {
        if (this.canJump) {
            Matter.Body.setVelocity(this.body, { x: this.body.velocity.x, y: -this.speed })
            //Matter.Body.applyForce(this.body,this.body.position,{x: 0, y: -0.3})
            this.canJump = false;
        }
    }
    moveDown() {
        Matter.Body.setVelocity(this.body, { x: this.body.velocity.x, y: +this.speed })
    }
    removeFrom(main) { //override
        this.exist=false;
        this.body.type = "body";
        Matter.World.remove(main.scene.engine.world, this.body);
        main.objects[this.body.id] = undefined;
    }
}
class Circle extends Object {
    constructor(x, y, rad, options, isStatic) {
        super();
        this.body = Matter.Bodies.circle(x, y, rad, options);
        this.body.friction = 0;
        this.setStatic(isStatic);
    }
}
class Rectangle extends Object {
    constructor(x, y, width, height, options, isStatic) {
        super();
        this.body = Matter.Bodies.rectangle(x, y, width, height, options);
        this.setStatic(isStatic);
    }
}
class Square extends Rectangle {
    constructor(x, y, length, options, isStatic) {
        super(x, y, length, length, options, isStatic);
        this.body.label = "Square Body";
    }
}
class Bar extends Rectangle {
    constructor(x, y, length, options, isStatic) {
        super(x, y, length, length, options, isStatic);
    }
}

class Polygon extends Object {
    constructor(x, y, sides, rad, options, isStatic) {
        super();
        this.body = Matter.Bodies.polygon(x, y, sides, rad, options);
        this.setStatic(isStatic);
        this.body.rad = rad;
    }
}

class Triangle extends Polygon {
    constructor(x, y, rad, options, isStatic) {
        super(x, y, 3, rad, options, isStatic);
        this.body.label = "Triangle Body";
    }
}

