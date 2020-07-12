import {Circle,Rectangle,Square,Triangle,Bar} from "../class/Object"
export function createObjct(label, x, y,data1, data2,options,isStatic) {
    //scaleでの実装ならdata1,data2要らないかも、、
    let obj;
    if (label === "Circle Body") {
        obj = new Circle(x,y,data1,options,isStatic);
    }
    else if (label === "Rectangle Body") {
        obj = new Rectangle(x,y,data1,data2,options,isStatic);
    }
    else if (label === "Square Body") {
        obj = new Square(x,y,data1,options,isStatic);
    }
    else if (label === "Triangle Body") {
        obj = new Triangle(x, y, data1,options,isStatic);
    }
    else if (label === "Bar Body") {
        console.log("AA")
        obj = new Bar(x, y, data1,options,isStatic);
    }
    return obj;
}
