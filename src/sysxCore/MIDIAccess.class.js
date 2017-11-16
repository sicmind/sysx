import MIDIDevice from './MIDIDevice.class';
export default class MIDIAccess {
    
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
            this.inputs[i.value.name] = new MIDIDevice(i.value);
        }
    }
    
    pollOutputs(){
        this.outputs = [];
        let outputs = this.access.outputs.values();
        for (let i = outputs.next(); i && !i.done; i = outputs.next()){
            this.outputs[i.value.name] = new MIDIDevice(i.value);
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