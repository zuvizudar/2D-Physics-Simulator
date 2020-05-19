import Matter from "matter-js"
export class Player {
    constructor() {
        this.exist = false;
    }
    init() {
        this.obj.type = "Player"
        this.canJump = true;
        this.speed = 7;
        this.exist = true;
    }
    moveRight() {
        Matter.Body.applyForce(this.obj, this.obj.position, { x: 0.01, y: 0 })
        //Matter.Body.setVelocity(this.obj, {x: this.speed, y: this.obj.velocity.y})
    }
    moveLeft() {
        Matter.Body.applyForce(this.obj, this.obj.position, { x: -0.01, y: 0 })
        //Matter.Body.setVelocity(this.obj, {x: -this.speed, y: this.obj.velocity.y})
    }
    moveUp() {
        if (this.canJump) {
            Matter.Body.setVelocity(this.obj, { x: this.obj.velocity.x, y: -this.speed })
            //Matter.Body.applyForce(this.obj,this.obj.position,{x: 0, y: -0.3})
            this.canJump = false;
        }
    }
    moveDown() {
        Matter.Body.setVelocity(this.obj, { x: this.obj.velocity.x, y: +this.speed })
    }
}
