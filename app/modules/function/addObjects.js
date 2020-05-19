import Matter from"matter-js"

import {createConstraint} from "./createConstraint"
import {update_after_adding} from "./addObject"
import {createObjct} from "./createObject"

export function addObjects(main,Objects) {
    Objects.map((c) => {
        if (c.ObjectType === "Constraint") {
            const constraint = createConstraint(main.objects,c.X + tmp, c.Y + tmp, c.Angle, c.Density, c.Restitution, c.Data1);
            Matter.World.add(main.scene.engine.world, constraint);
            main.objects[constraint.id] = constraint;
            main.scene.idCnt = constraint.id;
        } else {
            var obj = createObjct(c.ObjectType, c.X, c.Y, c.Color, c.isStatic, c.Angle, c.Density, c.Restitution, c.Data1, c.Data2, 1);
            update_after_adding(obj);
            Matter.World.add(main.scene.engine.world, obj);
        }
    })
}