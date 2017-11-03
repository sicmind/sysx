export default class MIDIDevice{
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