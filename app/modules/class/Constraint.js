import Matter from"matter-js"

export class Constraint {
    constructor(objects, id1, id2, x1, y1, x2, y2) {
        const options = {
            bodyA: objects[id1].body,
            pointA: { x: x1, y: y1 },
            bodyB: objects[id2].body,
            pointB: { x: x2, y: y2 },
            stiffness: 1,
        }
        this.body = Matter.Constraint.create(options);
        let group = Math.min(objects[id1].body.collisionFilter.group, objects[id2].body.collisionFilter.group);
        if (group >= 0)
            group = Matter.Body.nextGroup(true);

        objects[id1].body.collisionFilter.group = group;
        objects[id2].body.collisionFilter.group = group;
    }
    addToWorld(main) {
        Matter.World.add(main.scene.engine.world, this.body);
        main.objects[this.body.id] = this;
        main.scene.idCnt = this.body.id;
    }
}