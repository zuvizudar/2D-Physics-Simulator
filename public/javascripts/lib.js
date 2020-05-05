function addStack(numX,numY){
    var stackA = Composites.stack(100, 100, numX, numY, 0, 0, function(x, y) {
      return Bodies.rectangle(x, y, 15, 15); 
    });
    World.add(engine.world,stackA);
    console.log(stackA)
    stackA.bodies.map((c)=>{
      objects.push(c);
    })
  }

function addCircle(x, y, color,rad) {
    var ball = Bodies.circle(x, y, rad,{
        render:{
            fillStyle: color 
        }
    });
    ball.collisionFilter.group = 1;
    if(engine.world.gravity.y == 0){//開始前、マウスのみ接触
        attachFilter(ball);
    }
    World.add(engine.world, ball);
    objects.push(ball);
    return ball;
  }
  
function addRectangle(x, y,color,width, height) {
    let rectangle = Bodies.rectangle(x, y, width, height,{
        render:{
            fillStyle: color 
        }
    });
    rectangle.collisionFilter.group = 1;
    if(engine.world.gravity.y ==0)
      attachFilter(rectangle);
    World.add(engine.world, rectangle);
    objects.push(rectangle);
    return rectangle;
  }
function addPolygon(x,y,color,sides,rad){
    var polygon = Bodies.polygon(x,y,sides,rad,{
            render:{
                fillStyle:color 
            }
        })
    polygon.collisionFilter.group = 1;
    if(engine.world.gravity.y == 0)
        attachFilter(polygon);
    World.add(engine.world,polygon);
    objects.push(polygon);
    return polygon;
}  
function createObjct(type,x,y,color,isStatic,data1,data2){
    var obj;
    if(type === "Circle Body"){
        obj = addCircle(x,y,color,data1);
    }
    if(type === "Rectangle Body"){
        obj = addRectangle(x,y,color,data1,data2);
    }
    console.log(obj)
    obj.isStatic = isStatic;
    return obj;
}

function attachFilter(obj){ //マウスのみ接触するフィルター
    obj.collisionFilter={
      'group':0,
      'category':2,
      'mask':1,
    }
    obj.frictionAir = 1;
}
function reduce_friction(obj, rate) {
    obj.restitution =  1-1*rate;
}
  
$(document).on('click', '#start', function () {
  
    for(let i in objects){
      objects[i].collisionFilter.group = 1;
      objects[i].frictionAir = 0.01;
    }
    engine.world.gravity.y = 1
});