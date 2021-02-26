/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("vngage-scheduler", [], factory);
	else if(typeof exports === 'object')
		exports["vngage-scheduler"] = factory();
	else
		root["vngage-scheduler"] = factory();
})(this, function() {
return /******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"setInterval\": function() { return /* binding */ setInterval; },\n/* harmony export */   \"setTimeout\": function() { return /* binding */ setTimeout; },\n/* harmony export */   \"clearInterval\": function() { return /* binding */ clearInterval; },\n/* harmony export */   \"clearTimeout\": function() { return /* binding */ clearTimeout; }\n/* harmony export */ });\n/* harmony import */ var _scheduler_scheduler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scheduler/scheduler */ \"./src/scheduler/scheduler.js\");\n\n// window._scheduler = scheduler;   // For debugging...\nvar setInterval = _scheduler_scheduler__WEBPACK_IMPORTED_MODULE_0__.default.setInterval,\n    setTimeout = _scheduler_scheduler__WEBPACK_IMPORTED_MODULE_0__.default.setTimeout,\n    clearInterval = _scheduler_scheduler__WEBPACK_IMPORTED_MODULE_0__.default.clearInterval,\n    clearTimeout = _scheduler_scheduler__WEBPACK_IMPORTED_MODULE_0__.default.clearTimeout;\n\n\n//# sourceURL=webpack://vngage-scheduler/./src/index.js?");

/***/ }),

/***/ "./src/scheduler/scheduler.js":
/*!************************************!*\
  !*** ./src/scheduler/scheduler.js ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _worker_timerWorkerSrc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../worker/timerWorkerSrc */ \"./src/worker/timerWorkerSrc.js\");\n\n\nvar timers = {};\nvar scheduler = void 0;\n\ntry {\n    var blob = new Blob([_worker_timerWorkerSrc__WEBPACK_IMPORTED_MODULE_0__.timerWorkerSrc], { type: 'application/javascript; charset=utf-8' });\n    var url = window.URL.createObjectURL(blob);\n\n    var load = function load(url) {\n        var timerWorker = new Worker(url);\n\n        timerWorker.onmessage = function (e) {\n            if (!e || !e.data || typeof e.data.type !== 'string') {\n                return;\n            }\n\n            switch (e.data.type) {\n                case 'callback':\n                    if (e.data.id && timers[e.data.id]) {\n                        timers[e.data.id]();\n                    }\n                    break;\n                default:\n                    console.error('Unknown message from worker:', e);\n            }\n        };\n\n        var getRndId = function getRndId() {\n            return Math.random().toString().split('.')[1];\n        };\n\n        return {\n            setInterval: function setInterval(fn, interval) {\n                var id = getRndId();\n                timers[id] = fn;\n                timerWorker.postMessage({\n                    action: 'setInterval',\n                    id: id,\n                    interval: interval\n                });\n                return id;\n            },\n            clearInterval: function clearInterval(id) {\n                timerWorker.postMessage({\n                    action: 'clearInterval',\n                    id: id\n                });\n                delete timers[id];\n            },\n            setTimeout: function setTimeout(fn, timeout) {\n                var id = getRndId();\n                timers[id] = function () {\n                    delete timers[id];\n                    fn();\n                };\n                timerWorker.postMessage({\n                    action: 'setTimeout',\n                    id: id,\n                    timeout: timeout\n                });\n                return id;\n            },\n            clearTimeout: function clearTimeout(id) {\n                timerWorker.postMessage({\n                    action: 'clearTimeout',\n                    id: id\n                });\n                delete timers[id];\n            },\n            _debug: function _debug() {\n                timerWorker.postMessage({\n                    action: 'debug'\n                });\n                console.log('Scheduler timers:', timers);\n            }\n        };\n    };\n\n    scheduler = load(url);\n    scheduler.setTimeout(function () {\n        return URL.revokeObjectURL(url);\n    }, 0);\n    // console.log('Scheduler init successful');\n} catch (e) {\n    // If (for some reason) init fails: Map scheduler functions to native timer functions.\n    // NOTE: extra parameters to setTimeout() and setInterval() is not supported\n    // console.error('Scheduler init failed. Fallback to native timers');\n    scheduler = {\n        setInterval: function setInterval(fn, int) {\n            return window.setInterval(fn, int);\n        },\n        setTimeout: function setTimeout(fn) {\n            return window.setTimeout(fn);\n        },\n        clearInterval: function clearInterval(id) {\n            return window.clearInterval(id);\n        },\n        clearTimeout: function clearTimeout(id) {\n            return window.clearTimeout(id);\n        },\n        _debug: function _debug() {\n            console.log('Scheduler fallback to native timers');\n        }\n    };\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (scheduler);\n\n//# sourceURL=webpack://vngage-scheduler/./src/scheduler/scheduler.js?");

/***/ }),

/***/ "./src/worker/timerWorkerSrc.js":
/*!**************************************!*\
  !*** ./src/worker/timerWorkerSrc.js ***!
  \**************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"timerWorkerSrc\": function() { return /* reexport safe */ raw_loader_minify_loader_babel_loader_presets_env_modules_false_timerWorker_js__WEBPACK_IMPORTED_MODULE_0__.default; }\n/* harmony export */ });\n/* harmony import */ var raw_loader_minify_loader_babel_loader_presets_env_modules_false_timerWorker_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! raw-loader!../../minify-loader!babel-loader?{\"presets\": [ [\"env\", { \"modules\": false }] ] }!./timerWorker.js */ \"./node_modules/raw-loader/dist/cjs.js!./minify-loader.js!./node_modules/babel-loader/lib/index.js?{\\\"presets\\\": [ [\\\"env\\\", { \\\"modules\\\": false }] ] }!./src/worker/timerWorker.js\");\n// Export a transpiled, minified and stringified code of timerWorker.\n\n\n//# sourceURL=webpack://vngage-scheduler/./src/worker/timerWorkerSrc.js?");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./minify-loader.js!./node_modules/babel-loader/lib/index.js?{\"presets\": [ [\"env\", { \"modules\": false }] ] }!./src/worker/timerWorker.js":
/*!*************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./minify-loader.js!./node_modules/babel-loader/lib/index.js?{"presets": [ ["env", { "modules": false }] ] }!./src/worker/timerWorker.js ***!
  \*************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (\"var e={};self.addEventListener(\\\"message\\\",function(a){if(a&&a.data&&\\\"string\\\"==typeof a.data.action)switch(a.data.action){case\\\"setInterval\\\":e[a.data.id]=setInterval(function(){self.postMessage({type:\\\"callback\\\",id:a.data.id})},a.data.interval);break;case\\\"clearInterval\\\":e[a.data.id]&&(clearInterval(e[a.data.id]),delete e[a.data.id]);break;case\\\"setTimeout\\\":e[a.data.id]=setTimeout(function(){self.postMessage({type:\\\"callback\\\",id:a.data.id}),delete e[a.data.id]},a.data.timeout);break;case\\\"clearTimeout\\\":e[a.data.id]&&(clearTimeout(e[a.data.id]),delete e[a.data.id]);break;case\\\"debug\\\":console.log(\\\"timerWorker timers\\\",e);break;default:console.error(\\\"Unknown action\\\",a)}},!1);\");\n\n//# sourceURL=webpack://vngage-scheduler/./src/worker/timerWorker.js?./node_modules/raw-loader/dist/cjs.js!./minify-loader.js!./node_modules/babel-loader/lib/index.js?%7B%22presets%22:_%5B_%5B%22env%22,_%7B_%22modules%22:_false_%7D%5D_%5D_%7D");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});