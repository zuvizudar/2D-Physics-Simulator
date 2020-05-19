import Matter from "matter-js"


export class Mouse{
    constructor(scene){
      this.mousedrag = Matter.MouseConstraint.create(scene.engine, {
        mouse: Matter.Mouse.create(scene.render.canvas),
        constraint: {
          stiffness: 1,
          render: {
            visible: false
          }
        }
      });
      
      this.mousedrag.collisionFilter={
        'group':1,
        'category':1,
        'mask':2,
      }
      this.prev1={id:0,offset:{x:0,y:0}}; //TODO id初期値
      this.prev2={id:0,offset:{x:0,y:0}};
      this.clicked_screenOnly= 1; 
    }
    update(scale,offset){
        Matter.Mouse.setScale(this.mousedrag.mouse,{x:scale,y:scale});
        Matter.Mouse.setOffset(this.mousedrag.mouse,offset);
    }
  }
  