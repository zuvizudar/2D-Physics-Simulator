
var sceneObjects = $('#Info').data('objects');
var objects =[]
console.log(sceneObjects)
sceneObjects.map((c)=>{
    var obj;
    if(c.ObjectType === 1){
        obj = Bodies.circle(c.X,c.Y,c.Data1,{
            isStatic: c.isStatic,
            render:{
                fillStyle: c.Color
            }
        });        
    }
    if(c.ObjectType === 2){
        obj = Bodies.rectangle(c.X,c.Y,c.Data1,c.Data2,{
            isStatic: c.isStatic,
            render:{
                fillStyle: c.Color 
            }
        })
    }
    objects.push(obj);
})

World.add(engine.world,objects);

$(document).on('click', '#start', function () {
  
    for(let i in objects){
      objects[i].collisionFilter.group = 1;
    }
    engine.world.gravity.y = 1
});
  