
var sceneObjects = $('#Info').data('objects');

sceneObjects.map((c)=>{
    if ( c.ObjectType === "Constraint"){
        addConstraint(c.X,c.Y,c.Angle,c.Density,c.Restitution,c.Data1);
    }else{
        createObjct(c.ObjectType,c.X,c.Y,c.Color,
            c.isStatic,c.Angle,c.Density,c.Restitution,c.Data1,c.Data2,1);
    }
})
