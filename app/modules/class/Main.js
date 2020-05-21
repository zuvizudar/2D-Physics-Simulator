import { Scene } from "./Scene"
import { Mouse } from "./Mouse";
import {Player} from "./Player";
import Matter from "matter-js";


export  class Main{
    constructor(){
        this.objects = [];
    }
    init(){
        this.scene = new Scene();
        this.mouse = new Mouse(this.scene);
        this.player = new Player();
        Matter.World.add(this.scene.engine.world,this.mouse.mousedrag);
    }
    run(){
        window.requestAnimationFrame(this.run.bind(this));

        /*if(this.scene.hasChanged){
              this.scene.hasChanged = false; 
        }
        */
        this.keyMove()  
        
        if(this.player.exist){
            this.scene.cameraPos.x = this.player.obj.position.x;
            this.scene.cameraPos.y = this.player.obj.position.y;  
        }
        this.cameraUpdate();
        this.scene.update();
        this.mouse.update(this.scene.scale,this.scene.render.bounds.min);
    }
    cameraUpdate(){
        this.scene.cameraMove();
    }
    keyMove(){
        if(this.player.exist){
            if(this.scene.keys[68]){
                this.player.moveRight();
            }
            if(this.scene.keys[65]){
                this.player.moveLeft();
            }
            if(this.scene.keys[87]){
                this.player.moveUp();
            }
            if(this.scene.keys[83]){
                this.player.moveDown();
            }            
        }
        else{
            let speed = 5;
            if(this.scene.keys[68]){
                this.scene.cameraPos.x+=speed;    
            }
            if(this.scene.keys[65]){
                this.scene.cameraPos.x-=speed;
            }
            if(this.scene.keys[87]){
                this.scene.cameraPos.y-=speed;
            }
            if(this.scene.keys[83]){
                this.scene.cameraPos.y+=speed;
            }            
        }
        if(this.scene.keys[50]){
            this.scene.scale*=1.01;
        }
        if(this.scene.keys[51]){
            this.scene.scale/=1.01;
        }
    }
}