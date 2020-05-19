import Matter from "matter-js"
import {main} from "../../app1"
export { changeAngle, changeScale, changeDensity, changeRestitution, changeColor, changeStatic }

function changeAngle(id) {
    Matter.Body.setAngle(main.objects[id],
        document.forms.controlForm.elements[3].value / 100);
}
function changeScale(id) {
    var obj = main.objects[id];
    var nextScale = document.forms.controlForm.elements[4].value / 100;

    Matter.Body.scale(obj, 1 / obj.scale, 1 / obj.scale); //一回scale=1に戻す
    Matter.Body.scale(obj, nextScale, nextScale);
    switch (obj.label) {
        case 'Circle Body':
            //obj.circleRadius*=nextScale; //scaleでやってくれる
            break;
        case 'Square Body':
        case 'Bar Body':
            //obj.width*=nextScale;
            //obj.height*=nextScale;
            break;
        case 'Triangle Body':
            obj.rad *= nextScale;
            break;
    }
    obj.scale = nextScale;
}
function changeDensity(id) {
    Matter.Body.setDensity(main.objects[id],
        document.forms.controlForm.elements[5].value / 10000);
}
function changeRestitution(id) {
    main.objects[id].restitution = document.forms.controlForm.elements[6].value / 100
}
function changeColor(id) {
    main.objects[id].render.fillStyle = document.forms.controlForm.elements[7].value;
}
function changeStatic(id) {
    // Matter.Body.setStatic(main.objects[id], 
    //               document.forms.controlForm.elements[8].checked);
    console.log("A")
    main.objects[id].isStatic = document.forms.controlForm.elements[8].checked;
}