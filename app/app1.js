'use strict';

import $ from 'jquery';
const global = Function('return this;')();
global.jQuery = $;
window.$ = window.jQuery = $;
import bootstrap from 'bootstrap';
//import "bootstrap/dist/css/bootstrap.min.css"
import Matter from "matter-js"

import { Main } from './modules/class/Main';

import { addSquare, addTri, addCircle,addBar, addConstraint, addPlayer, addLib ,addIntervalObject,addBumper,addCar} from "./modules/function/addObject";
import { changeAngle, changeScale, changeDensity, changeRestitution, changeColor, changeStatic } from "./modules/function/changeObject"
import { save } from "./modules/function/save";

export var main = new Main();

main.init();
main.run();

Matter.Events.on(main.mouse.mousedrag, "mousedown", function (e) { //touchした座標をcontrolに反映
    document.forms.controlForm.elements[1].value = Math.floor(e.mouse.position.x);
    document.forms.controlForm.elements[2].value = Math.floor(e.mouse.position.y);
    if (main.mouse.clicked_screenOnly) {
        main.mouse.prev1.id = 0;
    }
    main.mouse.clicked_screenOnly = 1;
})

Matter.Events.on(main.mouse.mousedrag, "startdrag", function (e) {   // dragしたobjをcontrolに反映
    let Elements = document.forms.controlForm.elements;
    let prev1 = main.mouse.prev1;
    let prev2 = main.mouse.prev2;
    Elements[0].value = e.body.label;
    Elements[3].value = e.body.angle * 100;
    Elements[4].value = e.body.scale * 100;
    Elements[5].value = e.body.density * 10000; // 密度
    Elements[6].value = e.body.restitution * 100; // 反発
    Elements[7].value = e.body.render.fillStyle;
    Elements[8].checked = e.body.isStatic;
    console.log(main.objects);
    prev2.id = prev1.id;
    prev1.id = e.body.id;
    prev2.offset.x = prev1.offset.x;
    prev2.offset.y = prev1.offset.y;
    prev1.offset.x = e.mouse.mousedownPosition.x - e.body.position.x;
    prev1.offset.y = e.mouse.mousedownPosition.y - e.body.position.y;

    main.mouse.clicked_screenOnly = 0;
    if (e.body.label == "ne") {
        console.log(e);
    }
});
Matter.Events.on(main.scene.engine, 'collisionStart', function (event) {
    var pairs = event.pairs;
    for (let i in pairs) {
        if (pairs[i].bodyA.role === "Player" || pairs[i].bodyB.role === "Player") {
            main.objects[main.playerId].canJump = true;
        }
        if (pairs[i].bodyA.role === "Bumper") {
            const rad = Math.atan2(pairs[i].bodyB.position.y-pairs[i].bodyA.position.y,
                pairs[i].bodyB.position.x-pairs[i].bodyA.position.x);
            main.actions.push(
                ()=>{
                    Matter.Body.applyForce(pairs[i].bodyB, pairs[i].bodyB.position, { x: 0.5*Math.cos(rad), y: 0.5*Math.sin(rad)})
                }
            )
        }
        else if (pairs[i].bodyB.role === "Bumper") {
            const rad = Math.atan2(pairs[i].bodyA.position.y-pairs[i].bodyB.position.y,
                pairs[i].bodyA.position.x-pairs[i].bodyB.position.x);
            main.actions.push(
                ()=>{
                    Matter.Body.applyForce(pairs[i].bodyA, pairs[i].bodyA.position, { x: 0.5*Math.cos(rad), y: 0.5*Math.sin(rad)})
                }
            )            
        }
    }
});
Matter.Events.on(main.scene.engine, 'beforeUpdate', (e) => {
    while(main.actions.length>0){
        main.actions.pop()();
    }
});
document.body.addEventListener("keydown", function (e) {
    main.scene.keys[e.keyCode] = true;
    //main.scene.hasChanged = true;
})
document.body.addEventListener("keyup", function (e) {
    main.scene.keys[e.keyCode] = false;
})

$(document).on('change', '#changeAngle', function () {
    changeAngle(main.mouse.prev1.id)
});
$(document).on('change', '#changeScale', function () {
    changeScale(main.mouse.prev1.id)
});
$(document).on('change', '#changeDensity', function () {
    changeDensity(main.mouse.prev1.id)
});
$(document).on('change', '#changeRestitution', function () {
    changeRestitution(main.mouse.prev1.id)
});
$(document).on('change', '#changeColor', function () {
    changeColor(main.mouse.prev1.id)
});
$(document).on('change', '#changeStatic', function () {
    changeStatic(main.mouse.prev1.id)
});

$(document).on('click', '#addSquare', addSquare);
$(document).on('click', '#addCircle', addCircle);
$(document).on('click', '#addTri', addTri);
$(document).on('click', '#addBar',addBar);
$(document).on('click', '#addConstraint', addConstraint);
$(document).on('click', '#Delete', function(){
    console.log(main.objects[main.mouse.prev1.id])
    main.objects[main.mouse.prev1.id].removeFrom(main);
});

$(document).on('click', '#start', function () {
    main.start();
});
$(document).on('click', '#stop', () => {
    main.stop()
    
   /*const heading = document.querySelector('.message');
   heading.textContent = 'Clear';
   heading.style.animation = 'showMessage 1.5s 2 alternate forwards';
   console.log(heading)
   */
});

$(document).on('click', '#save', function () {
    save(main.objects);
});

$(document).on('click', '#addPlayer', function () {
    if (!main.player_exists) {
        addPlayer();
    }
});
$(document).on('click', '#addBumper', function () {
    addBumper();
});
$(document).on('click', '#addCar', function () {
    addCar();
});
$(document).on('click', '#addLib', function () {
    addLib(this.src.substr(26,36))
});