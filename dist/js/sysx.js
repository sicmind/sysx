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
/******/ 	__webpack_require__.p = "./dist/js/sysx.js";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const midihelpers = __webpack_require__(4);

class MIDIDevice{
    constructor(label, midi_responder){
		
		this.label = label;
		this.midi_responder = midi_responder;
      //        //console.log(device);
      //  this.connection      = device.connection;
      //  this.manufacturer    = device.manufacturer;
      //  this.name            = device.name;
      //->  device.onmidimessage   = this.onmidimessage;
      //  device.onstatechange   = this.onstatechange;
      //  this.state           = device.state;
      //  this.type            = device.type;
      //  this.version         = device.version;
      //  device.parent       = this;
        //this.com = new Event('com');
        this.listeners = [];
		this.inputs = [];
		this.outputs = [];
        this.midihelp = midihelpers;
    }
	
	addInput(input){
		input.parent = this;
		input.onmidimessage = this.onmidimessage;
		//input.onstatechange = this.onstatechange;
		this.inputs.push(input);
	}
	
	removeInput(input){
		this.inputs.pop(input);
	}
	
	addOutput(output){
		this.outputs.push(output);
	}
	
	removeOutput(output){
		this.outputs.pop(output);
	}
	
    
    addListener( obj ){
        //obj must have a receive_messge function
        this.listeners.push( obj );
    }
    
    removeListener( obj ){
        this.listeners.pop( obj );
    }
    
    onmidimessage( msg ){
		let response = {
			device:  this.name,
			message: msg,
            detail: this.parent.midihelp.get_type(msg.data[0])
         
		} 
		this.parent.midi_responder(response);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = MIDIDevice;


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sysxCore_Sysx_class__ = __webpack_require__(2);

//import TS12 from './IntrumentDefinitions/EnsoniqTS12/TS12';

//Libraries
//const tsSample = require('./IntrumentDefinitions/EnsoniqTS12/sampleData.js');

window.GLOBAL_MIDI_LISTENERS = [];

navigator.requestMIDIAccess({
    //sysex: true
}).then( function(midiAccess){

   		window.sysx = new __WEBPACK_IMPORTED_MODULE_0__sysxCore_Sysx_class__["a" /* default */](midiAccess);
 
}, function(){
	console.log("MIDI access is not possible at this time");
} );    
    



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__MIDIAccess_class__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__MIDIDevice_class__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__MIDIInstrument_class__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Parameter_class__ = __webpack_require__(6);






class Sysx{
	constructor(midiAccess){
		
		//midiaccess
		this.midiAccess = midiAccess;
		this.midiAccess.onStateChange = this.state_change_handler();
				
		this.devices = {};	
		this.MIDIobjects = [];
		
        this.listeners = [];
        
		this.scan_midi_ports();
	}
	
	scan_midi_ports(){
		this.devices = {};
		
		let inputs = this.midiAccess.inputs.values();
		let outputs = this.midiAccess.outputs.values();
		
		for (let i = inputs.next(); i && !i.done; i = inputs.next()){
			if(!this.devices[i.value.name]){
				this.devices[i.value.name] = new __WEBPACK_IMPORTED_MODULE_1__MIDIDevice_class__["a" /* default */](i.name, this.midi_message_receiver);
			}
			this.devices[i.value.name].addInput(i.value);
		}
		
		for (let o = outputs.next(); o && !o.done; o = outputs.next()){
			if(!this.devices[o.value.name]){
				this.devices[o.value.name] = new __WEBPACK_IMPORTED_MODULE_1__MIDIDevice_class__["a" /* default */](o.name, this.midi_message_receiver);
			}
			this.devices[o.value.name].addOutput(o.value);
		
		}
		
		//console.log(this.devices);
	}
	
	
	state_change_handler(){
		this.scan_midi_ports();
	}
	
	load_module(){}
    
    
    addListener( obj ){
        //obj must have a receive_messge function
        this.listeners.push( obj );
    }
    
    removeListener( obj ){
        this.listeners.pop( obj );
    }
	
    midi_message_receiver(msg){
        //console.log(msg);
        for(let l of window.GLOBAL_MIDI_LISTENERS){
            l.receive_message(msg);
        }
	}
    
    send_midi_message(msg){
        if(msg.device){
            this.devices[msg.device].outputs[0].send(msg.message);
        }
    }
    
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Sysx;


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__MIDIDevice_class__ = __webpack_require__(0);

class MIDIAccess {
    
    constructor(midiAccess){
        this.access = midiAccess;
        this.access.onStateChange = this.scan();
        this.scan();
		this.devices = {};
        this.inputs = {};
        this.outputs = {};
    }
    
    scan(){
        this.pollInputs();
        this.pollOutputs();
    }
        
    pollInputs(){
        this.inputs = {};
        let inputs = this.access.inputs.values();
        for (let i = inputs.next(); i && !i.done; i = inputs.next()){
			this.inputs[i.value.name] = new __WEBPACK_IMPORTED_MODULE_0__MIDIDevice_class__["a" /* default */](i.value);
			//console.log(i.value);
        }
    }
    
    pollOutputs(){
        this.outputs = [];
        let outputs = this.access.outputs.values();
        for (let i = outputs.next(); i && !i.done; i = outputs.next()){
            this.outputs[i.value.name] = new __WEBPACK_IMPORTED_MODULE_0__MIDIDevice_class__["a" /* default */](i.value);
		//	console.log(i.value);
        }
    }
    
    listInputs(){
        this.scan();
        return Object.keys(this.inputs);
    }
    
    listOutputs(){
        this.scan();
        return Object.keys(this.outputs);  
    }
}
/* unused harmony export default */


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = {

    statusBytes: {
    	0x00: 'InvalidType'          ,    
    	0x80: 'NoteOff'              ,    
    	0x90: 'NoteOn'               ,    
    	0xA0: 'AfterTouchPoly'       ,    
    	0xB0: 'ControlChange'        ,    
    	0xC0: 'ProgramChange'        ,    
    	0xD0: 'AfterTouchChannel'    ,    
    	0xE0: 'PitchBend'            ,    
    	0xF0: 'SystemExclusive'      ,    
    	0xF1: 'TimeCodeQuarterFrame' ,    
    	0xF2: 'SongPosition'         ,    
    	0xF3: 'SongSelect'           ,    
    	0xF6: 'TuneRequest'          ,    
    	0xF8: 'Clock'                ,    
    	0xFA: 'Start'                ,    
    	0xFB: 'Continue'             ,    
    	0xFC: 'Stop'                 ,    
    	0xFE: 'ActiveSensing'        ,    
    	0xFF: 'SystemReset'          ,    
    },
    
    get_type(hex){
        let s = this.to_nibbles(hex);
        if (s[0] >= 0 && s[0] <= 0xE){
            return { 
                status: this.statusBytes[s[0] << 4],
                channel: s[1]
            }
        }
    },

    to_nibbles: function(hex){
        return [ (hex & 0xF0) >> 4 , hex & 0x0F ];
    }

}



/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class MIDIInstument{
		constructor(header){
	        this.headerBytes = header;
			this.parameters = {};
		}
	
		addParameterObject(pObj){
	        this.parameters[pObj.label] = pObj;
		}
	
		bind_control(control, param){
			this.parameters[param].bind_control(control)
			this.parameters[param].update();
		}
		
		bind_midi_input_device(device){
			 device.addListener(this);
			 this.device = device;
		}
    
    list_all_parameters(){
        let r = []
        for(let p in this.parameters){
            r.push(p);
        }  
        return r;
    }
    
    setParam(param, value){
        this.parameters[param].setValue(value);
        return this.parameters[param].getValue();
    }
    
    getParam(param){
       return  this.parameters[param].getValue();
    }
    
    getParamAddress(param){
        return [0x54];
    }
    
    header(){
        let r = [];
        for(let k of Object.keys(this.headerBytes)){
            r.push(this.headerBytes[k]);
        }
        return r;
    }
    
    sendParam(param){
        this.send([0xF0, this.header(), this.getParamAddress(param), this.getParam(param), 0xF7 ])
    }
    
    
    send(msg){
        //@TODO this will connect to midi device via midimodule
			this.device.send(msg);
      console.log(msg);
    }
		
		receive_message(msg){
			
		}
}
/* unused harmony export default */


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Parameter {
	constructor(data){
        for(let k of Object.keys(data)){
            this[k] = data[k];
        }
        this.value = 0;
        this.displayValue = 0;
	}
	
    //connect parameter with GUI element
	bind_control(control){
		this.control = control;
		control.parameter = this;
		this.control.value = control.getAttribute('value');
	}
	
	setValue(val){
		this.value = val;
		//this.update();
	}
    
	getValue(){
		return this.value;
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
/* unused harmony export default */


/***/ })
/******/ ]);