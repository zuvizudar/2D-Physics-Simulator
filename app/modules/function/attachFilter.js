export function attachFilter_Mouse(obj) { //マウスのみ接触するフィルター
    obj.collisionFilter.category=2;
    obj.collisionFilter.mask=1;

    obj.frictionAir = 1; //動かないように
}
export function attachFilter_All(obj){
    obj.collisionFilter.category=4294967295;
    obj.collisionFilter.mask=4294967295;
}