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
		
		console.log(this.devices);
	}
	
	midi_message_receiver(msg){
		console.log(msg);
	}
	
	state_change_handler(){
		this.scan_midi_ports();
	}
	
	load_module(){}
}