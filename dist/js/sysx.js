/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sysxCore_MIDIAccess_class__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sysxCore_Instrument_class__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__sysxCore_Parameter_class__ = __webpack_require__(4);




//************testing**************//

//Communication Event
//var com = new Event('com'); -> moved to Parameter

navigator.requestMIDIAccess({
    sysex: true
}).then( function(midiAccess){
        const io = new __WEBPACK_IMPORTED_MODULE_0__sysxCore_MIDIAccess_class__["a" /* default */](midiAccess);
}, this.onMIDIFailure );

//let's create a few example parameters
	var lfo = {
		lfoshape:  new __WEBPACK_IMPORTED_MODULE_2__sysxCore_Parameter_class__["a" /* default */]('lfoshape'),
		lforate:   new __WEBPACK_IMPORTED_MODULE_2__sysxCore_Parameter_class__["a" /* default */]('lforate'),
		lfoamount: new __WEBPACK_IMPORTED_MODULE_2__sysxCore_Parameter_class__["a" /* default */]('lfoamount'),
		lfospeed:  new __WEBPACK_IMPORTED_MODULE_2__sysxCore_Parameter_class__["a" /* default */]('lfospeed'),
		lfodelay:  new __WEBPACK_IMPORTED_MODULE_2__sysxCore_Parameter_class__["a" /* default */]('lfodelay')
	}
	
	var env1 = {
		env1attack:  new __WEBPACK_IMPORTED_MODULE_2__sysxCore_Parameter_class__["a" /* default */]('env1attack'),
		env1decay:   new __WEBPACK_IMPORTED_MODULE_2__sysxCore_Parameter_class__["a" /* default */]('env1decay'),
		env1sustain: new __WEBPACK_IMPORTED_MODULE_2__sysxCore_Parameter_class__["a" /* default */]('env1sustain'),
		env1release:  new __WEBPACK_IMPORTED_MODULE_2__sysxCore_Parameter_class__["a" /* default */]('env1release')
	}
	
//and an example instrument to hold the parameters
	const MidiKeyboard = new __WEBPACK_IMPORTED_MODULE_1__sysxCore_Instrument_class__["a" /* default */]();
	MidiKeyboard.addParameterObject(lfo);
	MidiKeyboard.addParameterObject(env1);

//scrape the html for all controls	
	var controls = document.getElementsByClassName('control');
	for(let control of controls){
		MidiKeyboard.bind_control(control,control.getAttribute('param'));
		control.onmousedown = function(e){
			if(e.offsetY > (control.clientHeight/2)){
				control.parameter.value --;
			}else{
				control.parameter.value ++;
			}
			control.parameter.update();
		}
		control.addEventListener('com', function(){
			control.innerHTML = control.parameter.value;
		})
		control.parameter.update();
	}


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__MIDIDevice_class__ = __webpack_require__(2);

class MIDIAccess {
    
    constructor(midiAccess){
        this.access = midiAccess;
        this.access.onStateChange = this.scan();
        this.scan();
    }
    
    scan(){
        this.pollInputs();
        this.pollOutputs();
    }
        
    pollInputs(){
        this.inputs = [];
        let inputs = this.access.inputs.values();
        for (let i = inputs.next(); i && !i.done; i = inputs.next()){
            this.inputs.push(new __WEBPACK_IMPORTED_MODULE_0__MIDIDevice_class__["a" /* default */](i.value));
        }
    }
    
    pollOutputs(){
        this.outputs = [];
        let outputs = this.access.outputs.values();
        for (let i = outputs.next(); i && !i.done; i = outputs.next()){
            this.outputs.push(new __WEBPACK_IMPORTED_MODULE_0__MIDIDevice_class__["a" /* default */](i.value));
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = MIDIAccess;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class MIDIDevice{
    constructor(device){
        console.log(device);
        this.connection      = device.connection;
        this.manufacturer    = device.manufacturer;
        this.name            = device.name;
        device.onmidimessage   = this.onmidimessage;
        device.onstatechange   = this.onstatechange;
        this.state           = device.state;
        this.type            = device.type;
        this.version         = device.version;
    }
    
    onmidimessage(msg){
        console.log(msg);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = MIDIDevice;


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Instrument{
	constructor(){
		this.parameters = [];
	}
	
	addParameterObject(pObj){
		for (let p in pObj){
			this.parameters[p] = pObj[p];
		}
	}
	
	bind_control(control, param){
		this.parameters[param].bind_control(control)
		this.parameters[param].update();
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Instrument;


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Parameter {
	constructor(label){
		this.label = label;
		this.control = null;
        this.com = new Event('com');
		//randome values for testing
        this.value = Math.floor(Math.random() * 99);
        this.displayValue = Math.floor(Math.random() * 99);
	}
	
    //connect parameter with GUI element
	bind_control(control){
		this.control = control;
		control.parameter = this;
		this.control.value = control.getAttribute('value');
	}
	
	setValue(val){
		this.value = val;
		this.update();
	}
    
    scaler(){
        //@TODO value/dispalayvalue conversion
    }
	
	update(){
		if(this.control.value != this.value){
			this.control.setAttribute('value', this.value)
			this.control.dispatchEvent(this.com);
			//this.control.innerHTML = this.value;
		}
	}
	
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Parameter;


/***/ })
/******/ ]);