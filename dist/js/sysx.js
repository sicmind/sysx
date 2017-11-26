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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
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
/* harmony export (immutable) */ __webpack_exports__["a"] = MIDIInstument;


/***/ }),
/* 1 */
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
/* harmony export (immutable) */ __webpack_exports__["a"] = Parameter;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sysxCore_MIDIAccess_class__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sysxCore_MIDIInstrument_class__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__sysxCore_Parameter_class__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__IntrumentDefinitions_EnsoniqTS12_TS12__ = __webpack_require__(5);





//Libraries
const midispecs = __webpack_require__(6);
const tsSample = __webpack_require__(7);

//************testing**************//


//Communication Event
//var com = new Event('com'); -> moved to Parameter
navigator.requestMIDIAccess({
    sysex: true
}).then( function(midiAccess){
    console.log("let's go");

    const io = new __WEBPACK_IMPORTED_MODULE_0__sysxCore_MIDIAccess_class__["a" /* default */](midiAccess);
    //first, lets look up the header for our instrument
    const header = tsSample.TS_header;
    //then construct the instrument
    const ts12 = new __WEBPACK_IMPORTED_MODULE_3__IntrumentDefinitions_EnsoniqTS12_TS12__["a" /* default */](header);
    
        for(let p of tsSample.TS_params ){
            ts12.addParameterObject(new __WEBPACK_IMPORTED_MODULE_2__sysxCore_Parameter_class__["a" /* default */](p));
        }
        window.ts12 = ts12;
				
		ts12.bind_midi_input_device(io.inputs['IAC Driver Bus'])		
       // ts12.addParameterObject(tsSample.TS_params);
/*let's create a few example parameters
	var lfo = {
		lfoshape:  new Parameter('lfoshape'),
		lforate:   new Parameter('lforate'),
		lfoamount: new Parameter('lfoamount'),
		lfospeed:  new Parameter('lfospeed'),
		lfodelay:  new Parameter('lfodelay')
	}
	
	var env1 = {
		env1attack:  new Parameter('env1attack'),
		env1decay:   new Parameter('env1decay'),
		env1sustain: new Parameter('env1sustain'),
		env1release:  new Parameter('env1release')
	}
	
//and an example instrument to hold the parameters
	const MidiKeyboard = new MIDIInstrument();
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
*/
    //some debuging/test tools
    //@TODO build gui funciton lib
       const devices = document.createElement('div');
       devices.innerHTML = "Devices";
       for(let i of io.listInputs() ){
           let d = document.createElement('div');
           d.setAttribute('device',i);
           d.setAttribute('direction','input');
           d.className = 'deviceOption in';
           d.innerHTML = i;
           d.addEventListener('click', activateDevice)
           devices.appendChild(d);
       }
       
      // devices.innerHTML += "<div class='subhead'>outputs</div>";
       
       for(let i of io.listOutputs() ){
           let d = document.createElement('div');
           d.setAttribute('device',i);
           d.setAttribute('direction','output');
           d.className = 'deviceOption out';
           d.innerHTML = i;
           d.addEventListener('click', activateDevice)
           devices.appendChild(d);
       }
       
       document.body.insertBefore(devices, document.body.firstChild);
       

       
    var messageWindow = document.querySelector("#messageWindow");
    messageWindow.receive_message = function(msg){
        
        console.log(msg);
        let classname = "undefined";
        let messageType = '';
        if(typeof(msg) === 'object' && msg.type == 'midimessage'){
			 messageType = midispecs.MidiMessageType[ msg.data[0] ] ;
            
            
            let r = messageType+": ";
			for(let b of msg.data){
				r += b + ", ";
			}
			msg = r;
            
        }
        
        let d = document.createElement('div');
        d.innerHTML = msg;
        d.classList.add("midimessage");
        d.classList.add(messageType);
        messageWindow.appendChild(d);
        messageWindow.scrollTop = messageWindow.scrollHeight;
    }

    
    window.log = function(msg){
        messageWindow.receive_message(msg);
    }
     
    function activateDevice(e){
        if (e.target.classList.contains('active')){
            if( e.target.getAttribute('direction') =='input') {
              io.inputs[e.target.getAttribute('device')].removeListener(messageWindow);
               }
           if( e.target.getAttribute('direction') =='output') {
                   io.outputs[e.target.getAttribute('device')].removeListener(messageWindow);
                     }   
            e.target.classList.remove('active');
            
            
        }else{
           if( e.target.getAttribute('direction') =='input') {
             io.inputs[e.target.getAttribute('device')].addListener(messageWindow);
              }
           if( e.target.getAttribute('direction') =='output') {
               io.outputs[e.target.getAttribute('device')].addListener(messageWindow);
                 }   
              
             e.target.classList.add('active')
        }
    }
     
    
}, this.onMIDIFailure );    
    



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__MIDIDevice_class__ = __webpack_require__(4);

class MIDIAccess {
    
    constructor(midiAccess){
        this.access = midiAccess;
        this.access.onStateChange = this.scan();
        this.scan();
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
			console.log("yo");
        }
    }
    
    pollOutputs(){
        this.outputs = [];
        let outputs = this.access.outputs.values();
        for (let i = outputs.next(); i && !i.done; i = outputs.next()){
            this.outputs[i.value.name] = new __WEBPACK_IMPORTED_MODULE_0__MIDIDevice_class__["a" /* default */](i.value);
			console.log(i.value);
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
/* harmony export (immutable) */ __webpack_exports__["a"] = MIDIAccess;


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class MIDIDevice{
    constructor(device){
//        console.log(device);
        this.connection      = device.connection;
        this.manufacturer    = device.manufacturer;
        this.name            = device.name;
        device.onmidimessage   = this.onmidimessage;
        device.onstatechange   = this.onstatechange;
        this.state           = device.state;
        this.type            = device.type;
        this.version         = device.version;
        device.parent       = this;
        //this.com = new Event('com');
        this.listeners = [];
    }
    
    addListener( obj ){
        //obj must have a receive_messge function
        this.listeners.push( obj );
    }
    
    removeListener( obj ){
        this.listeners.pop( obj );
    }
    
    onmidimessage( msg ){
        for(let obj of this.parent.listeners){
            obj.receive_message(msg);
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = MIDIDevice;


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sysxCore_MIDIInstrument_class__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sysxCore_Parameter_class__ = __webpack_require__(1);


class TS12 extends __WEBPACK_IMPORTED_MODULE_0__sysxCore_MIDIInstrument_class__["a" /* default */] {
    
}
/* harmony export (immutable) */ __webpack_exports__["a"] = TS12;


/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = {

MidiMessageType: {
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
    }
}



/***/ }),
/* 7 */
/***/ (function(module, exports) {

//this will be from a database
module.exports = {

TS_params:[
 {
   "ID": 1,
   "Object": "LFO",
   "pg": 25,
   "s1": 0,
   "mi": "00",
   "off": 76,
   "type": "Pos Int",
   "label": "LFO Rate",
   "internal": "0,99",
   "displayed": "00,99"
 },
 {
   "ID": 2,
   "Object": "LFO",
   "pg": 25,
   "s1": 0,
   "mi": "01",
   "off": 76,
   "type": "Bit Table(7)",
   "label": "Track Rate Mod",
   "internal": "0,1",
   "displayed": "Size(1)"
 },
 {
   "ID": 3,
   "Object": "LFO",
   "pg": 25,
   "s1": 1,
   "mi": "x",
   "off": 74,
   "type": "TableLo",
   "label": "rate modsrc",
   "internal": "0,15",
   "displayed": "Size(5)"
 },
 {
   "ID": 4,
   "Object": "LFO",
   "pg": 25,
   "s1": 2,
   "mi": "x",
   "off": 75,
   "type": "Signed Frac",
   "label": "rate modeamt",
   "internal": "-127127",
   "displayed": "00,99"
 },
 {
   "ID": 5,
   "Object": "LFO",
   "pg": 25,
   "s1": 3,
   "mi": "x",
   "off": 73,
   "type": "Pos Frac",
   "label": "depth",
   "internal": "0,127",
   "displayed": "00,99"
 },
 {
   "ID": 6,
   "Object": "LFO",
   "pg": 25,
   "s1": 4,
   "mi": "x",
   "off": 71,
   "type": "TableLo",
   "label": "depth modsrc",
   "internal": "0,15",
   "displayed": "Size(5)"
 },
 {
   "ID": 7,
   "Object": "LFO",
   "pg": 25,
   "s1": 5,
   "mi": "x",
   "off": 72,
   "type": "Signed Frac",
   "label": "depth modamt",
   "internal": "-127127",
   "displayed": "-99,99"
 },
 {
   "ID": 8,
   "Object": "LFO",
   "pg": 26,
   "s1": 1,
   "mi": "x",
   "off": 71,
   "type": "TableHi",
   "label": "waveshape",
   "internal": "0,6",
   "displayed": "Size(8)"
 },
 {
   "ID": 9,
   "Object": "LFO",
   "pg": 26,
   "s1": 2,
   "mi": "x",
   "off": 74,
   "type": "TableHi",
   "label": "restart-mode",
   "internal": "0,1",
   "displayed": "Size(3)"
 },
 {
   "ID": 10,
   "Object": "LFO",
   "pg": 26,
   "s1": 3,
   "mi": "x",
   "off": 78,
   "type": "Unsigned Int",
   "label": "phase",
   "internal": "0,255",
   "displayed": "000,255"
 },
 {
   "ID": 11,
   "Object": "LFO",
   "pg": 26,
   "s1": 4,
   "mi": "x",
   "off": 77,
   "type": "unsigned Int",
   "label": "delay",
   "internal": "0,99",
   "displayed": "00,99"
 },
 {
   "ID": 12,
   "Object": "LFO",
   "pg": 26,
   "s1": 5,
   "mi": "x",
   "off": 87,
   "type": "Pos Frac",
   "label": "noise-rate",
   "internal": "0,127",
   "displayed": "00,99"
 },
 {
   "ID": 13,
   "Object": "ENV1",
   "pg": 27,
   "s1": 1,
   "mi": "00",
   "off": 1,
   "type": "Pos Int",
   "label": "attack",
   "internal": "0,99",
   "displayed": "00,99"
 },
 {
   "ID": 14,
   "Object": "ENV1",
   "pg": 27,
   "s1": 1,
   "mi": "01",
   "off": 1,
   "type": "Bit Table(7)",
   "label": "track attack mod",
   "internal": "0,1",
   "displayed": "Size(1)"
 },
 {
   "ID": 15,
   "Object": "ENV1",
   "pg": 27,
   "s1": 2,
   "mi": "x",
   "off": 3,
   "type": "Unsigned Int",
   "label": "decay 1",
   "internal": "0,99",
   "displayed": "00,99"
 },
 {
   "ID": 16,
   "Object": "ENV1",
   "pg": 27,
   "s1": 3,
   "mi": "x",
   "off": 5,
   "type": "Unsigned Int",
   "label": "decay 2",
   "internal": "0,99",
   "displayed": "00,99"
 },
 {
   "ID": 17,
   "Object": "ENV1",
   "pg": 27,
   "s1": 4,
   "mi": "x",
   "off": 7,
   "type": "unsigned Int",
   "label": "decay 3",
   "internal": "0,99",
   "displayed": "00,99"
 },
 {
   "ID": 18,
   "Object": "ENV1",
   "pg": 27,
   "s1": 5,
   "mi": "00",
   "off": 0,
   "type": "Pos Int",
   "label": "release",
   "internal": "0,99",
   "displayed": "00,99"
 },
 {
   "ID": 19,
   "Object": "ENV1",
   "pg": 27,
   "s1": 5,
   "mi": "01",
   "off": 9,
   "type": "Bit Table(7)",
   "label": "track release mod",
   "internal": "0,1",
   "displayed": "Size(1)"
 },
 {
   "ID": 20,
   "Object": "ENV1",
   "pg": 28,
   "s1": 1,
   "mi": "x",
   "off": 2,
   "type": "Pos Frac",
   "label": "peak",
   "internal": "0,127",
   "displayed": "00,99"
 },
 {
   "ID": 21,
   "Object": "ENV1",
   "pg": 28,
   "s1": 2,
   "mi": "x",
   "off": 4,
   "type": "Pos Frac",
   "label": "break 1",
   "internal": "0,127",
   "displayed": "00,99"
 },
 {
   "ID": 22,
   "Object": "ENV1",
   "pg": 28,
   "s1": 3,
   "mi": "x",
   "off": 5,
   "type": "Pos Frac",
   "label": "break 2",
   "internal": "0,127",
   "displayed": "00,99"
 },
 {
   "ID": 23,
   "Object": "ENV1",
   "pg": 28,
   "s1": 4,
   "mi": "x",
   "off": 8,
   "type": "Pos Frac",
   "label": "sustain",
   "internal": "0,127",
   "displayed": "00,99"
 },
 {
   "ID": 24,
   "Object": "ENV1",
   "pg": 28,
   "s1": 5,
   "mi": "x",
   "off": 10,
   "type": "Pos Frac",
   "label": "vel-lev",
   "internal": "0,127",
   "displayed": "00,99"
 },
 {
   "ID": 25,
   "Object": "ENV1",
   "pg": 29,
   "s1": 0,
   "mi": "x",
   "off": 13,
   "type": "TableHi",
   "label": "mode",
   "internal": "0,2",
   "displayed": "size(6)"
 },
 {
   "ID": 26,
   "Object": "ENV1",
   "pg": 29,
   "s1": 2,
   "mi": "x",
   "off": 13,
   "type": "TableLo",
   "label": "vel-curve",
   "internal": "0,99",
   "displayed": "Size(8)"
 },
 {
   "ID": 27,
   "Object": "ENV1",
   "pg": 29,
   "s1": 3,
   "mi": "x",
   "off": 12,
   "type": "Signed Frac",
   "label": "kbdtrack",
   "internal": "-127,127",
   "displayed": "-99,99"
 },
 {
   "ID": 28,
   "Object": "ENV1",
   "pg": 29,
   "s1": 4,
   "mi": "x",
   "off": 11,
   "type": "Pos Frac",
   "label": "vel-attack",
   "internal": "0,127",
   "displayed": "00,99"
 },
 {
   "ID": 29,
   "Object": "ENV1",
   "pg": 29,
   "s1": 5,
   "mi": "x",
   "off": 0,
   "type": "Signed Frac",
   "label": "vel-rlease",
   "internal": "-128,127",
   "displayed": "-99,99"
 },
 {
   "ID": 30,
   "Object": "ENV2",
   "pg": 30,
   "s1": 1,
   "mi": "00",
   "off": 15,
   "type": "Pos Int",
   "label": "attack",
   "internal": "0,99",
   "displayed": "00,99"
 },
 {
   "ID": 31,
   "Object": "ENV2",
   "pg": 30,
   "s1": 1,
   "mi": "01",
   "off": 15,
   "type": "bit Table(7)",
   "label": "track attack mod",
   "internal": "0,1",
   "displayed": "Size(1)"
 },
 {
   "ID": 32,
   "Object": "ENV2",
   "pg": 30,
   "s1": 2,
   "mi": "x",
   "off": 17,
   "type": "unsigned Int",
   "label": "decay 1",
   "internal": "0,99",
   "displayed": "00,99"
 },
 {
   "ID": 33,
   "Object": "ENV2",
   "pg": 30,
   "s1": 3,
   "mi": "x",
   "off": 19,
   "type": "unsigned Int",
   "label": "decay 2",
   "internal": "0,99",
   "displayed": "00,99"
 },
 {
   "ID": 34,
   "Object": "ENV2",
   "pg": 30,
   "s1": 4,
   "mi": "x",
   "off": 21,
   "type": "unsigned Int",
   "label": "decay 3",
   "internal": "0,99",
   "displayed": "00,99"
 },
 {
   "ID": 35,
   "Object": "ENV2",
   "pg": 30,
   "s1": 5,
   "mi": "00",
   "off": 23,
   "type": "Pos Int",
   "label": "relase",
   "internal": "0,99",
   "displayed": "00,99"
 },
 {
   "ID": 36,
   "Object": "ENV2",
   "pg": 30,
   "s1": 5,
   "mi": "01",
   "off": 23,
   "type": "bit Table(7)",
   "label": "track release mod",
   "internal": "0,1",
   "displayed": "Size(1)"
 },
 {
   "ID": 37,
   "Object": "ENV2",
   "pg": 31,
   "s1": 1,
   "mi": "x",
   "off": 2,
   "type": "Pos Frac",
   "label": "peak",
   "internal": "0,127",
   "displayed": "00,99"
 },
 {
   "ID": 38,
   "Object": "ENV2",
   "pg": 31,
   "s1": 2,
   "mi": "x",
   "off": 4,
   "type": "Pos Frac",
   "label": "break 1",
   "internal": "0,127",
   "displayed": "00,99"
 },
 {
   "ID": 39,
   "Object": "ENV2",
   "pg": 31,
   "s1": 3,
   "mi": "x",
   "off": 5,
   "type": "Pos Frac",
   "label": "break 2",
   "internal": "0,127",
   "displayed": "00,99"
 },
 {
   "ID": 40,
   "Object": "ENV2",
   "pg": 31,
   "s1": 4,
   "mi": "x",
   "off": 8,
   "type": "Pos Frac",
   "label": "sustain",
   "internal": "0,127",
   "displayed": "00,99"
 },
 {
   "ID": 41,
   "Object": "ENV2",
   "pg": 31,
   "s1": 5,
   "mi": "x",
   "off": 10,
   "type": "Pos Frac",
   "label": "vel-lev",
   "internal": "0,127",
   "displayed": "00,99"
 },
 {
   "ID": 42,
   "Object": "ENV2",
   "pg": 32,
   "s1": 0,
   "mi": "x",
   "off": 13,
   "type": "TableHi",
   "label": "mode",
   "internal": "0,2",
   "displayed": "size(6)"
 },
 {
   "ID": 43,
   "Object": "ENV2",
   "pg": 32,
   "s1": 2,
   "mi": "x",
   "off": 13,
   "type": "TableLo",
   "label": "vel-curve",
   "internal": "0,99",
   "displayed": "Size(8)"
 },
 {
   "ID": 44,
   "Object": "ENV2",
   "pg": 32,
   "s1": 3,
   "mi": "x",
   "off": 12,
   "type": "Signed Frac",
   "label": "kbdtrack",
   "internal": "-127,127",
   "displayed": "-99,99"
 },
 {
   "ID": 45,
   "Object": "ENV2",
   "pg": 32,
   "s1": 4,
   "mi": "x",
   "off": 11,
   "type": "Pos Frac",
   "label": "vel-attack",
   "internal": "0,127",
   "displayed": "00,99"
 },
 {
   "ID": 46,
   "Object": "ENV2",
   "pg": 32,
   "s1": 5,
   "mi": "x",
   "off": 0,
   "type": "Signed Frac",
   "label": "vel-rlease",
   "internal": "-128,127",
   "displayed": "-99,99"
 },
 {
   "ID": 47,
   "Object": "ENV3",
   "pg": 33,
   "s1": 1,
   "mi": "00",
   "off": 15,
   "type": "Pos Int",
   "label": "attack",
   "internal": "0,99",
   "displayed": "00,99"
 },
 {
   "ID": 48,
   "Object": "ENV3",
   "pg": 33,
   "s1": 1,
   "mi": "01",
   "off": 15,
   "type": "bit Table(7)",
   "label": "track attack mod",
   "internal": "0,1",
   "displayed": "Size(1)"
 },
 {
   "ID": 49,
   "Object": "ENV3",
   "pg": 33,
   "s1": 2,
   "mi": "x",
   "off": 17,
   "type": "unsigned Int",
   "label": "decay 1",
   "internal": "0,99",
   "displayed": "00,99"
 },
 {
   "ID": 50,
   "Object": "ENV3",
   "pg": 33,
   "s1": 3,
   "mi": "x",
   "off": 19,
   "type": "unsigned Int",
   "label": "decay 2",
   "internal": "0,99",
   "displayed": "00,99"
 },
 {
   "ID": 51,
   "Object": "ENV3",
   "pg": 33,
   "s1": 4,
   "mi": "x",
   "off": 21,
   "type": "unsigned Int",
   "label": "decay 3",
   "internal": "0,99",
   "displayed": "00,99"
 },
 {
   "ID": 52,
   "Object": "ENV3",
   "pg": 33,
   "s1": 5,
   "mi": "00",
   "off": 23,
   "type": "Pos Int",
   "label": "relase",
   "internal": "0,99",
   "displayed": "00,99"
 },
 {
   "ID": 53,
   "Object": "ENV3",
   "pg": 33,
   "s1": 5,
   "mi": "01",
   "off": 23,
   "type": "bit Table(7)",
   "label": "track release mod",
   "internal": "0,1",
   "displayed": "Size(1)"
 },
 {
   "ID": 54,
   "Object": "ENV3",
   "pg": 34,
   "s1": 1,
   "mi": "x",
   "off": 2,
   "type": "Pos Frac",
   "label": "peak",
   "internal": "0,127",
   "displayed": "00,99"
 },
 {
   "ID": 55,
   "Object": "ENV3",
   "pg": 34,
   "s1": 2,
   "mi": "x",
   "off": 4,
   "type": "Pos Frac",
   "label": "break 1",
   "internal": "0,127",
   "displayed": "00,99"
 },
 {
   "ID": 56,
   "Object": "ENV3",
   "pg": 34,
   "s1": 3,
   "mi": "x",
   "off": 5,
   "type": "Pos Frac",
   "label": "break 2",
   "internal": "0,127",
   "displayed": "00,99"
 },
 {
   "ID": 57,
   "Object": "ENV3",
   "pg": 34,
   "s1": 4,
   "mi": "x",
   "off": 8,
   "type": "Pos Frac",
   "label": "sustain",
   "internal": "0,127",
   "displayed": "00,99"
 },
 {
   "ID": 58,
   "Object": "ENV3",
   "pg": 34,
   "s1": 5,
   "mi": "x",
   "off": 10,
   "type": "Pos Frac",
   "label": "vel-lev",
   "internal": "0,127",
   "displayed": "00,99"
 },
 {
   "ID": 59,
   "Object": "ENV3",
   "pg": 35,
   "s1": 0,
   "mi": "x",
   "off": 13,
   "type": "TableHi",
   "label": "mode",
   "internal": "0,2",
   "displayed": "size(6)"
 },
 {
   "ID": 60,
   "Object": "ENV3",
   "pg": 35,
   "s1": 2,
   "mi": "x",
   "off": 13,
   "type": "TableLo",
   "label": "vel-curve",
   "internal": "0,99",
   "displayed": "Size(8)"
 },
 {
   "ID": 61,
   "Object": "ENV3",
   "pg": 35,
   "s1": 3,
   "mi": "x",
   "off": 12,
   "type": "Signed Frac",
   "label": "kbdtrack",
   "internal": "-127,127",
   "displayed": "-99,99"
 },
 {
   "ID": 62,
   "Object": "ENV3",
   "pg": 35,
   "s1": 4,
   "mi": "x",
   "off": 11,
   "type": "Pos Frac",
   "label": "vel-attack",
   "internal": "0,127",
   "displayed": "00,99"
 },
 {
   "ID": 63,
   "Object": "ENV3",
   "pg": 35,
   "s1": 5,
   "mi": "x",
   "off": 0,
   "type": "Signed Frac",
   "label": "vel-rlease",
   "internal": "-128,127",
   "displayed": "-99,99"
 }
],
TS_header: { 
    "ENSONIQ Code"          : 0x0F,
    "TS FAmily ID Code"     : 0x07,
    "Model ID"              : 0x00,
    "Device ID"             : 0x00,
    "MessageType"           : 0x00
},
TS_controls :[
 {
   "ID": 1,
   "label": "LFO Rate",
   "ParamID": 1,
   "Object": "range"
 },
 {
   "ID": 2,
   "label": "rate modeamt",
   "ParamID": 4,
   "Object": "range"
 },
 {
   "ID": 3,
   "label": "depth",
   "ParamID": 5,
   "Object": "range"
 },
 {
   "ID": 4,
   "label": "depth modamt",
   "ParamID": 7,
   "Object": "range"
 },
 {
   "ID": 5,
   "label": "phase",
   "ParamID": 10,
   "Object": "range"
 },
 {
   "ID": 6,
   "label": "delay",
   "ParamID": 11,
   "Object": "range"
 },
 {
   "ID": 7,
   "label": "noise-rate",
   "ParamID": 12,
   "Object": "range"
 },
 {
   "ID": 8,
   "label": "attack",
   "ParamID": 13,
   "Object": "range"
 },
 {
   "ID": 9,
   "label": "decay 1",
   "ParamID": 15,
   "Object": "range"
 },
 {
   "ID": 10,
   "label": "decay 2",
   "ParamID": 16,
   "Object": "range"
 },
 {
   "ID": 11,
   "label": "decay 3",
   "ParamID": 17,
   "Object": "range"
 },
 {
   "ID": 12,
   "label": "release",
   "ParamID": 18,
   "Object": "range"
 },
 {
   "ID": 13,
   "label": "peak",
   "ParamID": 20,
   "Object": "range"
 },
 {
   "ID": 14,
   "label": "break 1",
   "ParamID": 21,
   "Object": "range"
 },
 {
   "ID": 15,
   "label": "break 2",
   "ParamID": 22,
   "Object": "range"
 },
 {
   "ID": 16,
   "label": "sustain",
   "ParamID": 23,
   "Object": "range"
 },
 {
   "ID": 17,
   "label": "vel-lev",
   "ParamID": 24,
   "Object": "range"
 },
 {
   "ID": 18,
   "label": "kbdtrack",
   "ParamID": 27,
   "Object": "range"
 },
 {
   "ID": 19,
   "label": "vel-attack",
   "ParamID": 28,
   "Object": "range"
 },
 {
   "ID": 20,
   "label": "vel-rlease",
   "ParamID": 29,
   "Object": "range"
 },
 {
   "ID": 21,
   "label": "attack",
   "ParamID": 30,
   "Object": "range"
 },
 {
   "ID": 22,
   "label": "decay 1",
   "ParamID": 32,
   "Object": "range"
 },
 {
   "ID": 23,
   "label": "decay 2",
   "ParamID": 33,
   "Object": "range"
 },
 {
   "ID": 24,
   "label": "decay 3",
   "ParamID": 34,
   "Object": "range"
 },
 {
   "ID": 25,
   "label": "relase",
   "ParamID": 35,
   "Object": "range"
 },
 {
   "ID": 26,
   "label": "peak",
   "ParamID": 37,
   "Object": "range"
 },
 {
   "ID": 27,
   "label": "break 1",
   "ParamID": 38,
   "Object": "range"
 },
 {
   "ID": 28,
   "label": "break 2",
   "ParamID": 39,
   "Object": "range"
 },
 {
   "ID": 29,
   "label": "sustain",
   "ParamID": 40,
   "Object": "range"
 },
 {
   "ID": 30,
   "label": "vel-lev",
   "ParamID": 41,
   "Object": "range"
 },
 {
   "ID": 31,
   "label": "kbdtrack",
   "ParamID": 44,
   "Object": "range"
 },
 {
   "ID": 32,
   "label": "vel-attack",
   "ParamID": 45,
   "Object": "range"
 },
 {
   "ID": 33,
   "label": "vel-rlease",
   "ParamID": 46,
   "Object": "range"
 },
 {
   "ID": 34,
   "label": "attack",
   "ParamID": 47,
   "Object": "range"
 },
 {
   "ID": 35,
   "label": "decay 1",
   "ParamID": 49,
   "Object": "range"
 },
 {
   "ID": 36,
   "label": "decay 2",
   "ParamID": 50,
   "Object": "range"
 },
 {
   "ID": 37,
   "label": "decay 3",
   "ParamID": 51,
   "Object": "range"
 },
 {
   "ID": 38,
   "label": "relase",
   "ParamID": 52,
   "Object": "range"
 },
 {
   "ID": 39,
   "label": "peak",
   "ParamID": 54,
   "Object": "range"
 },
 {
   "ID": 40,
   "label": "break 1",
   "ParamID": 55,
   "Object": "range"
 },
 {
   "ID": 41,
   "label": "break 2",
   "ParamID": 56,
   "Object": "range"
 },
 {
   "ID": 42,
   "label": "sustain",
   "ParamID": 57,
   "Object": "range"
 },
 {
   "ID": 43,
   "label": "vel-lev",
   "ParamID": 58,
   "Object": "range"
 },
 {
   "ID": 44,
   "label": "kbdtrack",
   "ParamID": 61,
   "Object": "range"
 },
 {
   "ID": 45,
   "label": "vel-attack",
   "ParamID": 62,
   "Object": "range"
 },
 {
   "ID": 46,
   "label": "vel-rlease",
   "ParamID": 63,
   "Object": "range"
 },
 {
   "ID": 47,
   "label": "Track Rate Mod",
   "ParamID": 2,
   "Object": "select"
 },
 {
   "ID": 48,
   "label": "rate modsrc",
   "ParamID": 3,
   "Object": "select"
 },
 {
   "ID": 49,
   "label": "depth modsrc",
   "ParamID": 6,
   "Object": "select"
 },
 {
   "ID": 50,
   "label": "waveshape",
   "ParamID": 8,
   "Object": "select"
 },
 {
   "ID": 51,
   "label": "restart-mode",
   "ParamID": 9,
   "Object": "select"
 },
 {
   "ID": 52,
   "label": "track attack mod",
   "ParamID": 14,
   "Object": "select"
 },
 {
   "ID": 53,
   "label": "track release mod",
   "ParamID": 19,
   "Object": "select"
 },
 {
   "ID": 54,
   "label": "mode",
   "ParamID": 25,
   "Object": "select"
 },
 {
   "ID": 55,
   "label": "vel-curve",
   "ParamID": 26,
   "Object": "select"
 },
 {
   "ID": 56,
   "label": "track attack mod",
   "ParamID": 31,
   "Object": "select"
 },
 {
   "ID": 57,
   "label": "track release mod",
   "ParamID": 36,
   "Object": "select"
 },
 {
   "ID": 58,
   "label": "mode",
   "ParamID": 42,
   "Object": "select"
 },
 {
   "ID": 59,
   "label": "vel-curve",
   "ParamID": 43,
   "Object": "select"
 },
 {
   "ID": 60,
   "label": "track attack mod",
   "ParamID": 48,
   "Object": "select"
 },
 {
   "ID": 61,
   "label": "track release mod",
   "ParamID": 53,
   "Object": "select"
 },
 {
   "ID": 62,
   "label": "mode",
   "ParamID": 59,
   "Object": "select"
 },
 {
   "ID": 63,
   "label": "vel-curve",
   "ParamID": 60,
   "Object": "select"
 }
]
}

/***/ })
/******/ ]);