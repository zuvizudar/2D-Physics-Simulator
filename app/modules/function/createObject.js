import { Circle, Rectangle, Square, Triangle, Bar, Bumper, Player } from "../class/Object"
export function createObject(label, x, y, data1, data2, data3, options, isStatic) {
    //scaleでの実装ならdata1,data2要らないかも、、
    let obj;
    if (data3 == 0) {//player
        obj = new Player()
    }
    else if (data3 == 1) {//bumper
        obj = new Bumper(x, y, data1, options, isStatic);
    }
    else if (label === "Circle Body") {
        obj = new Circle(x, y, data1, options, isStatic);
    }
    else if (label === "Rectangle Body") {
        obj = new Rectangle(x, y, data1, data2, options, isStatic);
    }
    else if (label === "Square Body") {
        obj = new Square(x, y, data1, options, isStatic);
    }
    else if (label === "Triangle Body") {
        obj = new Triangle(x, y, data1, options, isStatic);
    }
    else if (label === "Bar Body") {
        obj = new Bar(x, y, data1, options, isStatic);
    }

    return obj;
}
