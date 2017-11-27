const midihelpers = require('./MIDIHelpers.lib');

export default class MIDIDevice{
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