'use strict';

import $ from 'jquery';
const global = Function('return this;')();
global.jQuery = $;
window.$ = window.jQuery = $;
import bootstrap from 'bootstrap';
//import "bootstrap/dist/css/bootstrap.min.css"

import { Main } from './modules/class/Main';

import {addObjects} from "./modules/function/addObjects"

export var main = new Main();

main.init();
main.run();

const sceneObjects = $('#Info').data('objects');

addObjects(main,sceneObjects)

$(document).on('click', '#start', ()=>{
    main.start();
});
