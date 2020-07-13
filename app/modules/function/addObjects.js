import {Constraint} from "../class/Constraint"
import {createObject} from "./createObject"


export function addObjects(main,Objects) {
    const tmp = main.scene.idCnt-1;
    Objects.map((c) => {
        if (c.ObjectType === "Constraint") {
            let constraint = new Constraint(main.objects,c.X + tmp, c.Y + tmp, c.Angle, c.Density, c.Restitution, c.Data1);
            constraint.addToWorld(main);
        } else {
            const options ={
                render:{
                  fillStyle:c.Color
                },
                angle:c.Angle,
                density:c.Density,
                restitution:c.Restitution,
                scale:1
            }
            let obj = createObject(c.ObjectType, c.X, c.Y, c.Data1, c.Data2,c.Data3,options,c.isStatic);
            obj.addToWorld(main);
        }
    })
}