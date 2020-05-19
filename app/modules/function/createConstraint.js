import Matter from "matter-js"

export function createConstraint(objects,id1, id2, x1, y1, x2, y2) {

    var constraint = Matter.Constraint.create({
        bodyA: objects[id1],
        pointA: { x: x1, y: y1 },
        bodyB: objects[id2],
        pointB: { x: x2, y: y2 },
        stiffness: 1,
    })

    // 同じobjへの結合を増やす時は、同じgroupにする
    var group = Math.min(objects[id1].collisionFilter.group, objects[id2].collisionFilter.group);

    if (group >= 0)
        var group = Matter.Body.nextGroup(true);

    objects[id1].collisionFilter.group = group;
    objects[id2].collisionFilter.group = group;

    return constraint;
}
