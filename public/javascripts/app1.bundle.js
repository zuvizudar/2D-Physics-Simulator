/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		0: 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([0,1]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "main", function() { return main; });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var bootstrap__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(bootstrap__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var matter_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5);
/* harmony import */ var matter_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(matter_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _modules_class_Main__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6);
/* harmony import */ var _modules_function_addObject__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(10);
/* harmony import */ var _modules_function_changeObject__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(14);
/* harmony import */ var _modules_function_save__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(15);



var global = Function('return this;')();
global.jQuery = jquery__WEBPACK_IMPORTED_MODULE_0___default.a;
window.$ = window.jQuery = jquery__WEBPACK_IMPORTED_MODULE_0___default.a;
 //import "bootstrap/dist/css/bootstrap.min.css"






var main = new _modules_class_Main__WEBPACK_IMPORTED_MODULE_3__["Main"]();
main.init();
main.run();
matter_js__WEBPACK_IMPORTED_MODULE_2___default.a.Events.on(main.mouse.mousedrag, "mousedown", function (e) {
  //touchした座標をcontrolに反映
  document.forms.controlForm.elements[1].value = Math.floor(e.mouse.position.x);
  document.forms.controlForm.elements[2].value = Math.floor(e.mouse.position.y);

  if (main.mouse.clicked_screenOnly) {
    //選択を外す時に使う,error出る
    main.mouse.prev1.id = 0;
  }

  main.mouse.clicked_screenOnly = 1;
});
matter_js__WEBPACK_IMPORTED_MODULE_2___default.a.Events.on(main.mouse.mousedrag, "startdrag", function (e) {
  // dragしたobjをcontrolに反映
  var Elements = document.forms.controlForm.elements;
  var prev1 = main.mouse.prev1;
  var prev2 = main.mouse.prev2;
  Elements[0].value = e.body.label;
  Elements[3].value = e.body.angle * 100;
  Elements[4].value = e.body.scale * 100;
  Elements[5].value = e.body.density * 10000; // 密度

  Elements[6].value = e.body.restitution * 100; // 反発

  Elements[7].value = e.body.render.fillStyle;
  Elements[8].checked = e.body.isStatic;
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
matter_js__WEBPACK_IMPORTED_MODULE_2___default.a.Events.on(main.scene.engine, 'collisionStart', function (event) {
  var pairs = event.pairs;

  var _loop = function _loop(i) {
    if (pairs[i].bodyA.role === "Player" || pairs[i].bodyB.role === "Player") {
      main.objects[main.playerId].canJump = true;
    }

    if (pairs[i].bodyA.role === "Bumper") {
      var rad = Math.atan2(pairs[i].bodyB.position.y - pairs[i].bodyA.position.y, pairs[i].bodyB.position.x - pairs[i].bodyA.position.x);
      main.actions.push(function () {
        matter_js__WEBPACK_IMPORTED_MODULE_2___default.a.Body.applyForce(pairs[i].bodyB, pairs[i].bodyB.position, {
          x: 0.5 * Math.cos(rad),
          y: 0.5 * Math.sin(rad)
        });
      });
    } else if (pairs[i].bodyB.role === "Bumper") {
      var _rad = Math.atan2(pairs[i].bodyA.position.y - pairs[i].bodyB.position.y, pairs[i].bodyA.position.x - pairs[i].bodyB.position.x);

      main.actions.push(function () {
        matter_js__WEBPACK_IMPORTED_MODULE_2___default.a.Body.applyForce(pairs[i].bodyA, pairs[i].bodyA.position, {
          x: 0.5 * Math.cos(_rad),
          y: 0.5 * Math.sin(_rad)
        });
      });
    }
  };

  for (var i in pairs) {
    _loop(i);
  }
});
matter_js__WEBPACK_IMPORTED_MODULE_2___default.a.Events.on(main.scene.engine, 'beforeUpdate', function (e) {
  while (main.actions.length > 0) {
    main.actions.pop()();
  }
});
document.body.addEventListener("keydown", function (e) {
  main.scene.keys[e.keyCode] = true; //main.scene.hasChanged = true;
});
document.body.addEventListener("keyup", function (e) {
  main.scene.keys[e.keyCode] = false;
});
jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('change', '#changeAngle', function () {
  Object(_modules_function_changeObject__WEBPACK_IMPORTED_MODULE_5__["changeAngle"])(main.mouse.prev1.id);
});
jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('change', '#changeScale', function () {
  Object(_modules_function_changeObject__WEBPACK_IMPORTED_MODULE_5__["changeScale"])(main.mouse.prev1.id);
});
jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('change', '#changeDensity', function () {
  Object(_modules_function_changeObject__WEBPACK_IMPORTED_MODULE_5__["changeDensity"])(main.mouse.prev1.id);
});
jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('change', '#changeRestitution', function () {
  Object(_modules_function_changeObject__WEBPACK_IMPORTED_MODULE_5__["changeRestitution"])(main.mouse.prev1.id);
});
jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('change', '#changeColor', function () {
  Object(_modules_function_changeObject__WEBPACK_IMPORTED_MODULE_5__["changeColor"])(main.mouse.prev1.id);
});
jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('change', '#changeStatic', function () {
  Object(_modules_function_changeObject__WEBPACK_IMPORTED_MODULE_5__["changeStatic"])(main.mouse.prev1.id);
});
jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('click', '#addSquare', _modules_function_addObject__WEBPACK_IMPORTED_MODULE_4__["addSquare"]);
jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('click', '#addCircle', _modules_function_addObject__WEBPACK_IMPORTED_MODULE_4__["addCircle"]);
jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('click', '#addTri', _modules_function_addObject__WEBPACK_IMPORTED_MODULE_4__["addTri"]);
jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('click', '#addBar', _modules_function_addObject__WEBPACK_IMPORTED_MODULE_4__["addBar"]);
jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('click', '#addConstraint', _modules_function_addObject__WEBPACK_IMPORTED_MODULE_4__["addConstraint"]);
jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('click', '#Delete', function () {
  console.log(main.objects[main.mouse.prev1.id]);
  main.objects[main.mouse.prev1.id].removeFrom(main);
});
jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('click', '#start', function () {
  main.start();
});
jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('click', '#stop', function () {
  main.stop();
  /*const heading = document.querySelector('.message');
  heading.textContent = 'Clear';
  heading.style.animation = 'showMessage 1.5s 2 alternate forwards';
  console.log(heading)
  */
});
jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('click', '#save', function () {
  Object(_modules_function_save__WEBPACK_IMPORTED_MODULE_6__["save"])(main.objects);
});
jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('click', '#search', function () {
  if (!Object(_modules_function_addObject__WEBPACK_IMPORTED_MODULE_4__["addLib"])(document.forms.searchForm.elements[0].value)) {}

  return false; //リロードさせない
});
jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('click', '#addPlayer', function () {
  if (!main.player_exists) {
    Object(_modules_function_addObject__WEBPACK_IMPORTED_MODULE_4__["addPlayer"])();
  }
});
jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('click', '#addBumper', function () {
  Object(_modules_function_addObject__WEBPACK_IMPORTED_MODULE_4__["addBumper"])();
});
jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('click', '#addCar', function () {
  Object(_modules_function_addObject__WEBPACK_IMPORTED_MODULE_4__["addCar"])();
});
jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('click', '#addField', function () {
  Object(_modules_function_addObject__WEBPACK_IMPORTED_MODULE_4__["addField"])();
});
jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('click', '#addBallPyramid', function () {
  Object(_modules_function_addObject__WEBPACK_IMPORTED_MODULE_4__["addBallPyramid"])();
});
jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('click', '#addFuriko', function () {
  Object(_modules_function_addObject__WEBPACK_IMPORTED_MODULE_4__["addFuriko"])();
});
jquery__WEBPACK_IMPORTED_MODULE_0___default()(document).on('click', '#addLib', function () {
  Object(_modules_function_addObject__WEBPACK_IMPORTED_MODULE_4__["addLib"])(this.src.substr(26, 36));
});

/***/ }),
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addCircle", function() { return addCircle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addSquare", function() { return addSquare; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addTri", function() { return addTri; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addBar", function() { return addBar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addPlayer", function() { return addPlayer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addConstraint", function() { return addConstraint; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addLib", function() { return addLib; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addIntervalObject", function() { return addIntervalObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addBumper", function() { return addBumper; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addCar", function() { return addCar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addField", function() { return addField; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addBallPyramid", function() { return addBallPyramid; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addFuriko", function() { return addFuriko; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "control2obj", function() { return control2obj; });
/* harmony import */ var matter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);
/* harmony import */ var matter_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(matter_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _app1__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
/* harmony import */ var _class_Constraint__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(11);
/* harmony import */ var _createObject__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(12);
/* harmony import */ var _addObjects__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(13);
/* harmony import */ var _class_Object__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(9);

 //TODO 







function addSquare() {
  document.forms.controlForm.elements[0].value = "Square Body";
  var obj = control2obj();
  obj.addToWorld(_app1__WEBPACK_IMPORTED_MODULE_1__["main"]);
}

function addTri() {
  document.forms.controlForm.elements[0].value = "Triangle Body";
  var obj = control2obj();
  obj.addToWorld(_app1__WEBPACK_IMPORTED_MODULE_1__["main"]);
}

;

function addCircle() {
  document.forms.controlForm.elements[0].value = "Circle Body";
  var obj = control2obj();
  obj.addToWorld(_app1__WEBPACK_IMPORTED_MODULE_1__["main"]);
}

;

function addBar() {
  document.forms.controlForm.elements[0].value = "Bar Body";
  var obj = control2obj();
  obj.addToWorld(_app1__WEBPACK_IMPORTED_MODULE_1__["main"]);
}

function copyControl() {
  var Elements = document.forms[0];

  var _Control_Size2data = Control_Size2data(Elements[0].value, Elements[4].value),
      data1 = _Control_Size2data.data1,
      data2 = _Control_Size2data.data2;

  var options = {
    render: {
      fillStyle: Elements[7].value
    },
    angle: Elements[3].value / 100,
    density: Elements[5].value / 10000,
    restitution: Elements[6].value / 100,
    scale: Elements[4].value / 100
  };
  var label = Elements[0].value,
      x = Number(Elements[1].value),
      y = Number(Elements[2].value);
  var isStatic = Elements[8].checked;
  return {
    label: label,
    x: x,
    y: y,
    data1: data1,
    data2: data2,
    options: options,
    isStatic: isStatic
  };
}

function control2obj() {
  var arg = copyControl();
  var obj = Object(_createObject__WEBPACK_IMPORTED_MODULE_3__["createObject"])(arg.label, arg.x, arg.y, arg.data1, arg.data2, null, arg.options, arg.isStatic); //type,x,y,color,isStatic,angle,density,restitution,data1,data2,scale

  return obj;
}
;

function Control_Size2data(label, rangeValue) {
  //[50,200] TODO: 調整
  var data1, data2;

  switch (label) {
    case 'Circle Body':
      data1 = _app1__WEBPACK_IMPORTED_MODULE_1__["main"].scene.standardRad * rangeValue / 100;
      break;

    case 'Square Body':
      data1 = data2 = rangeValue / 100 * _app1__WEBPACK_IMPORTED_MODULE_1__["main"].scene.standardSide;
      break;

    case 'Triangle Body':
      data1 = rangeValue / 100 * _app1__WEBPACK_IMPORTED_MODULE_1__["main"].scene.standardRad;
      break;

    case 'Bar Body':
      data1 = rangeValue / 100 * _app1__WEBPACK_IMPORTED_MODULE_1__["main"].scene.standardSide * 5;
      break;
  }

  return {
    data1: data1,
    data2: data2
  };
}

function addLib(sceneId) {
  //const hostURL = "http://localhost:8000";
  var hostURL = "https://sim-maker.herokuapp.com";
  var apiURL = hostURL + "/addLibrary/" + sceneId;
  $.ajax({
    url: apiURL,
    type: "POST",
    data: {
      sceneId: sceneId
    },
    dataType: "json",
    scriptCharset: "utf-8",
    timeout: 3000
  }).then(function (data) {
    if (data.status == "OK") Object(_addObjects__WEBPACK_IMPORTED_MODULE_4__["addObjects"])(_app1__WEBPACK_IMPORTED_MODULE_1__["main"], data.objects);else {
      console.log(data.message);
      document.querySelector('#errorMessage').innerHTML = data.message;
    }
    return true;
  }, function (XMLHttpRequest, textStatus, errorThrown) {
    //todo :空欄で追加すると404
    console.log("error");
    console.log("XMLHttpRequest : " + XMLHttpRequest.status);
    console.log("textStatus     : " + textStatus);
    console.log("errorThrown    : " + errorThrown.message);
    return false;
  });
}

function addIntervalObject() {
  var arg = copyControl();
  var obj = Object(_createObject__WEBPACK_IMPORTED_MODULE_3__["createObject"])(arg.label, arg.x, arg.y, arg.data1, arg.data2, null, arg.options, arg.isStatic);
  obj.addToWorld(_app1__WEBPACK_IMPORTED_MODULE_1__["main"]);
  setInterval(function () {
    if (_app1__WEBPACK_IMPORTED_MODULE_1__["main"].scene.isRunning) {
      var _obj = Object(_createObject__WEBPACK_IMPORTED_MODULE_3__["createObject"])(arg.label, arg.x, arg.y, arg.data1, arg.data2, null, arg.options, arg.isStatic);

      _obj.addToWorld(_app1__WEBPACK_IMPORTED_MODULE_1__["main"]);
    }
  }, 1000);
}

function addPlayer() {
  document.forms.controlForm.elements[0].value = "Circle Body"; //let obj = control2obj();

  var arg = copyControl();
  var obj = Object(_createObject__WEBPACK_IMPORTED_MODULE_3__["createObject"])(arg.label, arg.x, arg.y, arg.data1, arg.data2, 0, arg.options, arg.isStatic); //data3=0

  obj.addToWorld(_app1__WEBPACK_IMPORTED_MODULE_1__["main"]);
}

function addConstraint() {
  var prev1 = _app1__WEBPACK_IMPORTED_MODULE_1__["main"].mouse.prev1;
  var prev2 = _app1__WEBPACK_IMPORTED_MODULE_1__["main"].mouse.prev2;

  if (prev1.id > 0 && prev2.id > 0 && prev1.id != prev2.id) {
    var constraint = new _class_Constraint__WEBPACK_IMPORTED_MODULE_2__["Constraint"](_app1__WEBPACK_IMPORTED_MODULE_1__["main"].objects, prev1.id, prev2.id, prev1.offset.x, prev1.offset.y, prev2.offset.x, prev2.offset.y);
    constraint.addToWorld(_app1__WEBPACK_IMPORTED_MODULE_1__["main"]);
  }
}

;

function addBumper() {
  document.forms.controlForm.elements[0].value = "Circle Body"; //let obj = control2obj();

  var arg = copyControl();
  var obj = Object(_createObject__WEBPACK_IMPORTED_MODULE_3__["createObject"])(arg.label, arg.x, arg.y, arg.data1, arg.data2, 1, arg.options, arg.isStatic); //data3=1

  obj.addToWorld(_app1__WEBPACK_IMPORTED_MODULE_1__["main"]);
}

function addCar() {
  var xx = 50,
      yy = 50,
      wheelSize = 30;
  var wheelBase = 20,
      wheelAOffset = -120 * 0.5 + wheelBase,
      wheelBOffset = 120 * 0.5 - wheelBase,
      wheelYOffset = 0;
  var rec_options = {
    scale: 1
  };
  var cir_options = {
    render: {
      fillStyle: "red"
    },
    restitution: 0.1,
    scale: 1,
    friction: 0
  };
  var rec = Object(_createObject__WEBPACK_IMPORTED_MODULE_3__["createObject"])("Rectangle Body", xx, yy, 120, 30, null, rec_options, false);
  var cir1 = Object(_createObject__WEBPACK_IMPORTED_MODULE_3__["createObject"])("Circle Body", xx + wheelAOffset, yy + wheelYOffset, wheelSize, 30, null, cir_options, false);
  var cir2 = Object(_createObject__WEBPACK_IMPORTED_MODULE_3__["createObject"])("Circle Body", xx + wheelBOffset, yy + wheelYOffset, wheelSize, 30, null, cir_options, false);
  rec.addToWorld(_app1__WEBPACK_IMPORTED_MODULE_1__["main"]);
  cir1.addToWorld(_app1__WEBPACK_IMPORTED_MODULE_1__["main"]);
  cir2.addToWorld(_app1__WEBPACK_IMPORTED_MODULE_1__["main"]);
  var constraint1 = new _class_Constraint__WEBPACK_IMPORTED_MODULE_2__["Constraint"](_app1__WEBPACK_IMPORTED_MODULE_1__["main"].objects, rec.body.id, cir1.body.id, wheelAOffset, wheelYOffset, 0, 0);
  constraint1.addToWorld(_app1__WEBPACK_IMPORTED_MODULE_1__["main"]);
  var constraint2 = new _class_Constraint__WEBPACK_IMPORTED_MODULE_2__["Constraint"](_app1__WEBPACK_IMPORTED_MODULE_1__["main"].objects, rec.body.id, cir2.body.id, wheelBOffset, wheelYOffset, 0, 0);
  constraint2.addToWorld(_app1__WEBPACK_IMPORTED_MODULE_1__["main"]);
}

function addFuriko() {
  var options = {
    restitution: 0.8,
    scale: 1
  }; //const len = 50/100 *main.scene.standardSide ;

  var rec = Object(_createObject__WEBPACK_IMPORTED_MODULE_3__["createObject"])("Rectangle Body", _app1__WEBPACK_IMPORTED_MODULE_1__["main"].scene.width / 2, 150, 20, 20, null, options, true);
  var cir = Object(_createObject__WEBPACK_IMPORTED_MODULE_3__["createObject"])("Circle Body", _app1__WEBPACK_IMPORTED_MODULE_1__["main"].scene.width / 2, 400, 50, null, null, options, false);
  rec.addToWorld(_app1__WEBPACK_IMPORTED_MODULE_1__["main"]);
  cir.addToWorld(_app1__WEBPACK_IMPORTED_MODULE_1__["main"]);
  var constraint = new _class_Constraint__WEBPACK_IMPORTED_MODULE_2__["Constraint"](_app1__WEBPACK_IMPORTED_MODULE_1__["main"].objects, rec.body.id, cir.body.id, 0, 0, 0, 0);
  constraint.addToWorld(_app1__WEBPACK_IMPORTED_MODULE_1__["main"]);
}

function addField() {
  var tmp = [];
  var width = _app1__WEBPACK_IMPORTED_MODULE_1__["main"].scene.width;
  var height = _app1__WEBPACK_IMPORTED_MODULE_1__["main"].scene.height;
  var options = {
    render: {
      fillStyle: '#4d4d4d'
    },
    angle: 0,
    density: 0.005,
    restitution: 0,
    scale: 1
  };
  var length1 = 200 / 100 * _app1__WEBPACK_IMPORTED_MODULE_1__["main"].scene.standardSide * 5;
  var length2 = 150 / 100 * _app1__WEBPACK_IMPORTED_MODULE_1__["main"].scene.standardSide * 5;
  tmp[0] = Object(_createObject__WEBPACK_IMPORTED_MODULE_3__["createObject"])("Rectangle Body", width / 2, height, length1, length1 / 20, null, options, true);
  tmp[1] = Object(_createObject__WEBPACK_IMPORTED_MODULE_3__["createObject"])("Rectangle Body", 0, height / 2, length2 / 20, length2, null, options, true);
  tmp[2] = Object(_createObject__WEBPACK_IMPORTED_MODULE_3__["createObject"])("Rectangle Body", width, height / 2, length2 / 20, length2, null, options, true);

  for (var i in tmp) {
    tmp[i].addToWorld(_app1__WEBPACK_IMPORTED_MODULE_1__["main"]);
  }
}

function addBallPyramid() {
  var arg = copyControl();
  /*if(arg.options.render == null){
    arg.options.render = {fillStyle:'white'}
  }*/

  var options = {
    render: {
      //fillStyle:arg.options.render
      fillStyle: 'white'
    },
    angle: 0,
    density: 0.001,
    restitution: 0,
    scale: 1
  };

  for (var i = 0; i < 9; i++) {
    for (var j = 0; j <= i; j++) {
      var x = _app1__WEBPACK_IMPORTED_MODULE_1__["main"].scene.width / 2 - i * 35 + j * 70;
      var y = 50 + i * 50;
      var tmp = Object(_createObject__WEBPACK_IMPORTED_MODULE_3__["createObject"])("Circle Body", x, y, 10, null, null, options, true);
      tmp.addToWorld(_app1__WEBPACK_IMPORTED_MODULE_1__["main"]);
    }
  }
}
/*
function createStack(numX, numY) {
    let stackA = Composites.stack(100, 100, numX, numY, 0, 0, function (x, y) {
        return Matter.Bodies.rectangle(x, y, 15, 15);
    });
    World.add(engine.world, stackA);
    console.log(stackA)
    stackA.Matter.Bodies.map((c) => {
        objects[c.id]=c;
    })
}*/

/***/ }),
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "changeAngle", function() { return changeAngle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "changeScale", function() { return changeScale; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "changeDensity", function() { return changeDensity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "changeRestitution", function() { return changeRestitution; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "changeColor", function() { return changeColor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "changeStatic", function() { return changeStatic; });
/* harmony import */ var matter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);
/* harmony import */ var matter_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(matter_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _app1__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);




function changeAngle(id) {
  matter_js__WEBPACK_IMPORTED_MODULE_0___default.a.Body.setAngle(_app1__WEBPACK_IMPORTED_MODULE_1__["main"].objects[id].body, document.forms.controlForm.elements[3].value / 100);
}

function changeScale(id) {
  var obj = _app1__WEBPACK_IMPORTED_MODULE_1__["main"].objects[id].body;
  var nextScale = document.forms.controlForm.elements[4].value / 100;
  matter_js__WEBPACK_IMPORTED_MODULE_0___default.a.Body.scale(obj, 1 / obj.scale, 1 / obj.scale); //一回scale=1に戻す

  matter_js__WEBPACK_IMPORTED_MODULE_0___default.a.Body.scale(obj, nextScale, nextScale);

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
  matter_js__WEBPACK_IMPORTED_MODULE_0___default.a.Body.setDensity(_app1__WEBPACK_IMPORTED_MODULE_1__["main"].objects[id].body, document.forms.controlForm.elements[5].value / 10000);
}

function changeRestitution(id) {
  _app1__WEBPACK_IMPORTED_MODULE_1__["main"].objects[id].body.restitution = document.forms.controlForm.elements[6].value / 100;
}

function changeColor(id) {
  _app1__WEBPACK_IMPORTED_MODULE_1__["main"].objects[id].body.render.fillStyle = document.forms.controlForm.elements[7].value;
}

function changeStatic(id) {
  // Matter.Body.setStatic(main.objects[id].body, 
  //               document.forms.controlForm.elements[8].checked);
  console.log("A");
  _app1__WEBPACK_IMPORTED_MODULE_1__["main"].objects[id].body.isStatic = document.forms.controlForm.elements[8].checked;
}

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "save", function() { return save; });
/* harmony import */ var _checkRange__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(16);
/* harmony import */ var _roundFloat__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(17);
//保存
//var hostURL = "https://two-sim.herokuapp.com";


function save(objects) {
  console.log(objects); //var hostURL = "http://localhost:8000";

  var hostURL = "https://sim-maker.herokuapp.com";
  var apiURL = hostURL + "/making/save";
  var sceneInfo = [],
      data = [],
      nextIdMap = [],
      nextIdCnt = 2;

  for (var i = 0; i < 4; i++) {
    var c = document.forms.saveForm.elements[i];
    if (i === 3) sceneInfo.push(c.checked);else sceneInfo.push(c.value);
  }

  for (var _i = 1; _i < objects.length; _i++) {
    if (objects[_i] === undefined) {
      continue;
    }

    if (objects[_i].body.label === "Constraint") {
      var tmp = {
        "type": objects[_i].body.label,
        "x": nextIdMap[objects[_i].body.bodyA.id],
        "y": nextIdMap[objects[_i].body.bodyB.id],
        "color": "white",
        "isStatic": true,
        "angle": Object(_roundFloat__WEBPACK_IMPORTED_MODULE_1__["roundFloat"])(objects[_i].body.pointA.x, 4),
        "density": Object(_roundFloat__WEBPACK_IMPORTED_MODULE_1__["roundFloat"])(objects[_i].body.pointA.y, 4),
        "restitution": Object(_roundFloat__WEBPACK_IMPORTED_MODULE_1__["roundFloat"])(objects[_i].body.pointB.x, 4),
        "data1": Object(_roundFloat__WEBPACK_IMPORTED_MODULE_1__["roundFloat"])(objects[_i].body.pointB.y, 4),
        "data2": 0
      };
    } else {
      /*//範囲外なら保存しない
      if (checkRange(main,objects[i].body)) //TODO 片方消えた時のconstraint
          continue;
      */
      var _obj2data = obj2data(objects[_i].body),
          data1 = _obj2data.data1,
          data2 = _obj2data.data2;

      if (data1 === -1) continue;
      var tmp = {
        "type": objects[_i].body.label,
        "x": Object(_roundFloat__WEBPACK_IMPORTED_MODULE_1__["roundFloat"])(objects[_i].body.position.x, 4),
        "y": Object(_roundFloat__WEBPACK_IMPORTED_MODULE_1__["roundFloat"])(objects[_i].body.position.y, 4),
        "color": objects[_i].body.render.fillStyle,
        "isStatic": objects[_i].body.isStatic,
        "angle": Object(_roundFloat__WEBPACK_IMPORTED_MODULE_1__["roundFloat"])(objects[_i].body.angle, 3),
        "density": Object(_roundFloat__WEBPACK_IMPORTED_MODULE_1__["roundFloat"])(objects[_i].body.density, 3),
        "restitution": Object(_roundFloat__WEBPACK_IMPORTED_MODULE_1__["roundFloat"])(objects[_i].body.restitution, 4),
        "data1": Object(_roundFloat__WEBPACK_IMPORTED_MODULE_1__["roundFloat"])(data1, 2),
        "data2": Object(_roundFloat__WEBPACK_IMPORTED_MODULE_1__["roundFloat"])(data2, 2)
      };

      if (objects[_i].body.role == "Player") {
        tmp.data3 = 0; //player
      } else if (objects[_i].body.role == "Bumper") {
        tmp.data3 = 1; //bumper
      }

      nextIdMap[objects[_i].body.id] = nextIdCnt;
    }

    data.push(tmp);
    nextIdCnt++;
  }

  $.ajax({
    url: apiURL,
    type: "POST",
    data: {
      "data": data,
      "sceneInfo": sceneInfo
    },
    dataType: "text",
    scriptCharset: "utf-8",
    timeout: 3000
  }).then(function (data) {
    console.log("ok");
    window.location.href = hostURL + "/scenes/" + data;
  }, function (XMLHttpRequest, textStatus, errorThrown) {
    console.log("error");
    console.log("XMLHttpRequest : " + XMLHttpRequest.status);
    console.log("textStatus     : " + textStatus);
    console.log("errorThrown    : " + errorThrown.message);
  });
}

function obj2data(obj) {
  //dataは(width,height) or (rad,null)とか
  var data1, data2;

  switch (obj.label) {
    case 'Circle Body':
      data1 = obj.circleRadius;
      break;

    case 'Rectangle Body':
    case 'Square Body':
    case 'Bar Body':
      //data1 = obj.width;
      //data2 = obj.height;
      data1 = getDis(obj.vertices[0], obj.vertices[1]);
      data2 = getDis(obj.vertices[0], obj.vertices[3]);
      break;

    case 'Triangle Body':
      data1 = obj.rad;
      break;

    default:
      data1 = -1;
  }

  return {
    data1: data1,
    data2: data2
  };
}

function getDis(obj1, obj2) {
  return Math.sqrt(Math.pow(obj2.x - obj1.x, 2) + Math.pow(obj2.y - obj1.y, 2));
}

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "checkRange", function() { return checkRange; });
function checkRange(main, obj) {
  var x = obj.position.x,
      y = obj.position.y;
  if (x < 0 || x > main.scene.width || y < 0 || y > main.scene.height) return 1;else return 0;
}

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "roundFloat", function() { return roundFloat; });
function roundFloat(number, n) {
  var _pow = Math.pow(10, n);

  return Math.round(number * _pow) / _pow;
}

/***/ })
/******/ ]);