/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/sysx.js":
/*!*********************!*\
  !*** ./src/sysx.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _sysxCore_Sysx_class__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sysxCore/Sysx.class */ \"./src/sysxCore/Sysx.class.js\");\n\n//import TS12 from './IntrumentDefinitions/EnsoniqTS12/TS12';\n\n//Libraries\n//const tsSample = require('./IntrumentDefinitions/EnsoniqTS12/sampleData.js');\n\nwindow.GLOBAL_MIDI_LISTENERS = [];\n\nnavigator.requestMIDIAccess({\n    //sysex: true\n}).then( function(midiAccess){\n\n   \t\twindow.sysx = new _sysxCore_Sysx_class__WEBPACK_IMPORTED_MODULE_0__.default(midiAccess);\n \n}, function(){\n\tconsole.log(\"MIDI access is not possible at this time\");\n} );    \n    \n\n\n\n//# sourceURL=webpack://sysx/./src/sysx.js?");

/***/ }),

/***/ "./src/sysxCore/MIDIAccess.class.js":
/*!******************************************!*\
  !*** ./src/sysxCore/MIDIAccess.class.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => /* binding */ MIDIAccess\n/* harmony export */ });\n/* harmony import */ var _MIDIDevice_class__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MIDIDevice.class */ \"./src/sysxCore/MIDIDevice.class.js\");\n\nclass MIDIAccess {\n    \n    constructor(midiAccess){\n        this.access = midiAccess;\n        this.access.onStateChange = this.scan();\n        this.scan();\n\t\tthis.devices = {};\n        this.inputs = {};\n        this.outputs = {};\n    }\n    \n    scan(){\n        this.pollInputs();\n        this.pollOutputs();\n    }\n        \n    pollInputs(){\n        this.inputs = {};\n        let inputs = this.access.inputs.values();\n        for (let i = inputs.next(); i && !i.done; i = inputs.next()){\n\t\t\tthis.inputs[i.value.name] = new _MIDIDevice_class__WEBPACK_IMPORTED_MODULE_0__.default(i.value);\n\t\t\t//console.log(i.value);\n        }\n    }\n    \n    pollOutputs(){\n        this.outputs = [];\n        let outputs = this.access.outputs.values();\n        for (let i = outputs.next(); i && !i.done; i = outputs.next()){\n            this.outputs[i.value.name] = new _MIDIDevice_class__WEBPACK_IMPORTED_MODULE_0__.default(i.value);\n\t\t//\tconsole.log(i.value);\n        }\n    }\n    \n    listInputs(){\n        this.scan();\n        return Object.keys(this.inputs);\n    }\n    \n    listOutputs(){\n        this.scan();\n        return Object.keys(this.outputs);  \n    }\n}\n\n//# sourceURL=webpack://sysx/./src/sysxCore/MIDIAccess.class.js?");

/***/ }),

/***/ "./src/sysxCore/MIDIDevice.class.js":
/*!******************************************!*\
  !*** ./src/sysxCore/MIDIDevice.class.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => /* binding */ MIDIDevice\n/* harmony export */ });\nconst midihelpers = __webpack_require__(/*! ./MIDIHelpers.lib */ \"./src/sysxCore/MIDIHelpers.lib.js\");\n\nclass MIDIDevice{\n    constructor(label, midi_responder){\n\t\t\n\t\tthis.label = label;\n\t\tthis.midi_responder = midi_responder;\n      //        //console.log(device);\n      //  this.connection      = device.connection;\n      //  this.manufacturer    = device.manufacturer;\n      //  this.name            = device.name;\n      //->  device.onmidimessage   = this.onmidimessage;\n      //  device.onstatechange   = this.onstatechange;\n      //  this.state           = device.state;\n      //  this.type            = device.type;\n      //  this.version         = device.version;\n      //  device.parent       = this;\n        //this.com = new Event('com');\n        this.listeners = [];\n\t\tthis.inputs = [];\n\t\tthis.outputs = [];\n        this.midihelp = midihelpers;\n    }\n\t\n\taddInput(input){\n\t\tinput.parent = this;\n\t\tinput.onmidimessage = this.onmidimessage;\n\t\t//input.onstatechange = this.onstatechange;\n\t\tthis.inputs.push(input);\n\t}\n\t\n\tremoveInput(input){\n\t\tthis.inputs.pop(input);\n\t}\n\t\n\taddOutput(output){\n\t\tthis.outputs.push(output);\n\t}\n\t\n\tremoveOutput(output){\n\t\tthis.outputs.pop(output);\n\t}\n\t\n    \n    addListener( obj ){\n        //obj must have a receive_messge function\n        this.listeners.push( obj );\n    }\n    \n    removeListener( obj ){\n        this.listeners.pop( obj );\n    }\n    \n    onmidimessage( msg ){\n\t\tlet response = {\n\t\t\tdevice:  this.name,\n\t\t\tmessage: msg,\n            detail: this.parent.midihelp.get_type(msg.data[0])\n         \n\t\t} \n\t\tthis.parent.midi_responder(response);\n    }\n}\n\n//# sourceURL=webpack://sysx/./src/sysxCore/MIDIDevice.class.js?");

/***/ }),

/***/ "./src/sysxCore/MIDIHelpers.lib.js":
/*!*****************************************!*\
  !*** ./src/sysxCore/MIDIHelpers.lib.js ***!
  \*****************************************/
/***/ ((module) => {

eval("module.exports = {\n\n    statusBytes: {\n    \t0x00: 'InvalidType'          ,    \n    \t0x80: 'NoteOff'              ,    \n    \t0x90: 'NoteOn'               ,    \n    \t0xA0: 'AfterTouchPoly'       ,    \n    \t0xB0: 'ControlChange'        ,    \n    \t0xC0: 'ProgramChange'        ,    \n    \t0xD0: 'AfterTouchChannel'    ,    \n    \t0xE0: 'PitchBend'            ,    \n    \t0xF0: 'SystemExclusive'      ,    \n    \t0xF1: 'TimeCodeQuarterFrame' ,    \n    \t0xF2: 'SongPosition'         ,    \n    \t0xF3: 'SongSelect'           ,    \n    \t0xF6: 'TuneRequest'          ,    \n    \t0xF8: 'Clock'                ,    \n    \t0xFA: 'Start'                ,    \n    \t0xFB: 'Continue'             ,    \n    \t0xFC: 'Stop'                 ,    \n    \t0xFE: 'ActiveSensing'        ,    \n    \t0xFF: 'SystemReset'          ,    \n    },\n    \n    get_type(hex){\n        let s = this.to_nibbles(hex);\n        if (s[0] >= 0 && s[0] <= 0xE){\n            return { \n                status: this.statusBytes[s[0] << 4],\n                channel: s[1]\n            }\n        }\n    },\n\n    to_nibbles: function(hex){\n        return [ (hex & 0xF0) >> 4 , hex & 0x0F ];\n    }\n\n}\n\n\n\n//# sourceURL=webpack://sysx/./src/sysxCore/MIDIHelpers.lib.js?");

/***/ }),

/***/ "./src/sysxCore/MIDIInstrument.class.js":
/*!**********************************************!*\
  !*** ./src/sysxCore/MIDIInstrument.class.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => /* binding */ MIDIInstument\n/* harmony export */ });\nclass MIDIInstument{\n\t\tconstructor(header){\n\t        this.headerBytes = header;\n\t\t\tthis.parameters = {};\n\t\t}\n\t\n\t\taddParameterObject(pObj){\n\t        this.parameters[pObj.label] = pObj;\n\t\t}\n\t\n\t\tbind_control(control, param){\n\t\t\tthis.parameters[param].bind_control(control)\n\t\t\tthis.parameters[param].update();\n\t\t}\n\t\t\n\t\tbind_midi_input_device(device){\n\t\t\t device.addListener(this);\n\t\t\t this.device = device;\n\t\t}\n    \n    list_all_parameters(){\n        let r = []\n        for(let p in this.parameters){\n            r.push(p);\n        }  \n        return r;\n    }\n    \n    setParam(param, value){\n        this.parameters[param].setValue(value);\n        return this.parameters[param].getValue();\n    }\n    \n    getParam(param){\n       return  this.parameters[param].getValue();\n    }\n    \n    getParamAddress(param){\n        return [0x54];\n    }\n    \n    header(){\n        let r = [];\n        for(let k of Object.keys(this.headerBytes)){\n            r.push(this.headerBytes[k]);\n        }\n        return r;\n    }\n    \n    sendParam(param){\n        this.send([0xF0, this.header(), this.getParamAddress(param), this.getParam(param), 0xF7 ])\n    }\n    \n    \n    send(msg){\n        //@TODO this will connect to midi device via midimodule\n\t\t\tthis.device.send(msg);\n      console.log(msg);\n    }\n\t\t\n\t\treceive_message(msg){\n\t\t\t\n\t\t}\n}\n\n//# sourceURL=webpack://sysx/./src/sysxCore/MIDIInstrument.class.js?");

/***/ }),

/***/ "./src/sysxCore/Parameter.class.js":
/*!*****************************************!*\
  !*** ./src/sysxCore/Parameter.class.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => /* binding */ Parameter\n/* harmony export */ });\nclass Parameter {\n\tconstructor(data){\n        for(let k of Object.keys(data)){\n            this[k] = data[k];\n        }\n        this.value = 0;\n        this.displayValue = 0;\n\t}\n\t\n    //connect parameter with GUI element\n\tbind_control(control){\n\t\tthis.control = control;\n\t\tcontrol.parameter = this;\n\t\tthis.control.value = control.getAttribute('value');\n\t}\n\t\n\tsetValue(val){\n\t\tthis.value = val;\n\t\t//this.update();\n\t}\n    \n\tgetValue(){\n\t\treturn this.value;\n\t}\n    \n    scaler(){\n        //@TODO value/dispalayvalue conversion\n    }\n\t\n\tupdate(){\n\t\tif(this.control.value != this.value){\n\t\t\tthis.control.setAttribute('value', this.value)\n\t\t\tthis.control.dispatchEvent(this.com);\n\t\t\t//this.control.innerHTML = this.value;\n\t\t}\n\t}\n    \n    \n\t\n}\n\n//# sourceURL=webpack://sysx/./src/sysxCore/Parameter.class.js?");

/***/ }),

/***/ "./src/sysxCore/Sysx.class.js":
/*!************************************!*\
  !*** ./src/sysxCore/Sysx.class.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => /* binding */ Sysx\n/* harmony export */ });\n/* harmony import */ var _MIDIAccess_class__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MIDIAccess.class */ \"./src/sysxCore/MIDIAccess.class.js\");\n/* harmony import */ var _MIDIDevice_class__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MIDIDevice.class */ \"./src/sysxCore/MIDIDevice.class.js\");\n/* harmony import */ var _MIDIInstrument_class__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./MIDIInstrument.class */ \"./src/sysxCore/MIDIInstrument.class.js\");\n/* harmony import */ var _Parameter_class__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Parameter.class */ \"./src/sysxCore/Parameter.class.js\");\n\n\n\n\n\n\nclass Sysx{\n\tconstructor(midiAccess){\n\t\t\n\t\t//midiaccess\n\t\tthis.midiAccess = midiAccess;\n\t\tthis.midiAccess.onStateChange = this.state_change_handler();\n\t\t\t\t\n\t\tthis.devices = {};\t\n\t\tthis.MIDIobjects = [];\n\t\t\n        this.listeners = [];\n        \n\t\tthis.scan_midi_ports();\n\t}\n\t\n\tscan_midi_ports(){\n\t\tthis.devices = {};\n\t\t\n\t\tlet inputs = this.midiAccess.inputs.values();\n\t\tlet outputs = this.midiAccess.outputs.values();\n\t\t\n\t\tfor (let i = inputs.next(); i && !i.done; i = inputs.next()){\n\t\t\tif(!this.devices[i.value.name]){\n\t\t\t\tthis.devices[i.value.name] = new _MIDIDevice_class__WEBPACK_IMPORTED_MODULE_1__.default(i.name, this.midi_message_receiver);\n\t\t\t}\n\t\t\tthis.devices[i.value.name].addInput(i.value);\n\t\t}\n\t\t\n\t\tfor (let o = outputs.next(); o && !o.done; o = outputs.next()){\n\t\t\tif(!this.devices[o.value.name]){\n\t\t\t\tthis.devices[o.value.name] = new _MIDIDevice_class__WEBPACK_IMPORTED_MODULE_1__.default(o.name, this.midi_message_receiver);\n\t\t\t}\n\t\t\tthis.devices[o.value.name].addOutput(o.value);\n\t\t\n\t\t}\n\t\t\n\t\t//console.log(this.devices);\n\t}\n\t\n\t\n\tstate_change_handler(){\n\t\tthis.scan_midi_ports();\n\t}\n\t\n\tload_module(){}\n    \n    \n    addListener( obj ){\n        //obj must have a receive_messge function\n        this.listeners.push( obj );\n    }\n    \n    removeListener( obj ){\n        this.listeners.pop( obj );\n    }\n\t\n    midi_message_receiver(msg){\n        //console.log(msg);\n        for(let l of window.GLOBAL_MIDI_LISTENERS){\n            l.receive_message(msg);\n        }\n\t}\n    \n    send_midi_message(msg){\n        if(msg.device){\n            this.devices[msg.device].outputs[0].send(msg.message);\n        }\n    }\n    \n}\n\n//# sourceURL=webpack://sysx/./src/sysxCore/Sysx.class.js?");

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
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/sysx.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;