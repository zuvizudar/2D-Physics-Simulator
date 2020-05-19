export function checkRange(main,obj) {
    const x = obj.position.x,
        y = obj.position.y;
    if (x < 0 || x > main.scene.width || y < 0 || y > main.scene.height)
        return 1;
    else return 0;
}