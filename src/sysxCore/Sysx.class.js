import MIDIAccess from './MIDIAccess.class';
import MIDIDevice from './MIDIDevice.class';
import MIDIInstrument from './MIDIInstrument.class';
import Parameter from './Parameter.class';


export default class Sysx{
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
				this.devices[i.value.name] = new MIDIDevice(i.name, this.midi_message_receiver);
			}
			this.devices[i.value.name].addInput(i.value);
		}
		
		for (let o = outputs.next(); o && !o.done; o = outputs.next()){
			if(!this.devices[o.value.name]){
				this.devices[o.value.name] = new MIDIDevice(o.name, this.midi_message_receiver);
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