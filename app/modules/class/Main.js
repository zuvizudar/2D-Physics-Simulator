import { Scene } from "./Scene"
import { Mouse } from "./Mouse";
import { Player } from "./Object";
import Matter from "matter-js";

export class Main {
    constructor() {
        this.objects = [];
        this.actions = [];
        this.player_exists = false;
        this.playerId = 0;
        this.isRunning = false;
    }
    init() {
        this.scene = new Scene();
        this.mouse = new Mouse(this.scene);
        Matter.World.add(this.scene.engine.world, this.mouse.mousedrag);
    }
    run() {
        window.requestAnimationFrame(this.run.bind(this));

        /*if(this.scene.hasChanged){
              this.scene.hasChanged = false; 
        }
        */
        this.keyMove()

        if (this.player_exists && this.isRunning) {
            this.scene.cameraPos.x = this.objects[this.playerId].body.position.x;
            this.scene.cameraPos.y = this.objects[this.playerId].body.position.y;
        }
        this.cameraUpdate();
        this.scene.update();
        this.mouse.update(this.scene.scale, this.scene.render.bounds.min);
    }
    cameraUpdate() {
        this.scene.cameraMove();
    }
    keyMove() {
        if (this.player_exists && this.isRunning) {
            if (this.scene.keys[68]) {
                this.objects[this.playerId].moveRight();
            }
            if (this.scene.keys[65]) {
                this.objects[this.playerId].moveLeft();
            }
            if (this.scene.keys[87]) {
                this.objects[this.playerId].moveUp();
            }
            if (this.scene.keys[83]) {
                this.objects[this.playerId].moveDown();
            }
        }
        else {
            let speed = 5;
            if (this.scene.keys[68]) {
                this.scene.cameraPos.x += speed;
            }
            if (this.scene.keys[65]) {
                this.scene.cameraPos.x -= speed;
            }
            if (this.scene.keys[87]) {
                this.scene.cameraPos.y -= speed;
            }
            if (this.scene.keys[83]) {
                this.scene.cameraPos.y += speed;
            }
            if (this.scene.keys[32]) {
                console.log("A");
                return false;//スクロール防止
            }
        }
        if (this.scene.keys[50]) {
            this.scene.scale *= 1.01;
        }
        if (this.scene.keys[51]) {
            this.scene.scale /= 1.01;
        }
    }
    start() {
        this.isRunning = true;
        for (let i in this.objects) {
            if (this.objects[i] === undefined || this.objects[i].body.label === "Constraint") continue;
            this.objects[i].attachFilter_All();
            this.objects[i].body.frictionAir = 0;
        }
        this.scene.engine.world.gravity.y = 1
    }
    stop() {
        this.isRunning = false;
        for (let i in this.objects) {
            if (this.objects[i] === undefined || this.objects[i].body.label === "Constraint") continue;
            this.objects[i].attachFilter_Mouse();
        }
        this.scene.engine.world.gravity.y = 0;
    }
}