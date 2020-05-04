
var sceneObjects = $('#Info').data('objects');

console.log(sceneObjects)
sceneObjects.map((c)=>{
    createObjct(c.ObjectType,c.X,c.Y,c.Color,c.isStatic,c.Data1,c.Data2);
})
