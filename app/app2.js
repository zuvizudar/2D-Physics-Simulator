'use strict';

import $ from 'jquery';
const global = Function('return this;')();
global.jQuery = $;
window.$ = window.jQuery = $;
import bootstrap from 'bootstrap';
//import "bootstrap/dist/css/bootstrap.min.css"

import Matter from "matter-js"
import { Main } from './modules/class/Main';

import {addObjects} from "./modules/function/addObjects"

export var main = new Main();

main.init();
main.run();

const sceneObjects = $('#Info').data('objects');

addObjects(main,sceneObjects)
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
})
document.body.addEventListener("keyup", function (e) {
    main.scene.keys[e.keyCode] = false;
})
$(document).on('click', '#start', ()=>{
    main.start();
});
