import Matter from "matter-js"
var Bounds = Matter.Bounds;
export class Scene {
    constructor(){
      this.width=700,
      this.height=500;
      this.engine = Matter.Engine.create();
      this.render = Matter.Render.create({
        canvas: document.getElementById("scene"),
        engine: this.engine,
        options: {
          width: this.width,
          height: this.height,
          wireframes: false,
          hasBounds:true
        }
      });
      Matter.Render.run(this.render);
      
      this.engine.world.gravity.y = 0;
      this.fps = 30;

      this.standardRad = this.width/20,
      this.standardSide = this.width/10;
      this.idCnt = 1;
      this.objCnt = 0;

      this.keys = [];

      this.cameraPos={x:this.width/2,y:this.height/2};
      this.scale = 1.5;
    }
    update(){
        Matter.Engine.update(this.engine);
    }
    cameraMove(){
      this.render.bounds.min.x = this.cameraPos.x - this.width/2*this.scale;;
      this.render.bounds.max.x = this.cameraPos.x + this.width/2*this.scale;
      this.render.bounds.min.y = this.cameraPos.y - this.height/2*this.scale;
      this.render.bounds.max.y = this.cameraPos.y + this.height/2*this.scale;
    }
  }
  