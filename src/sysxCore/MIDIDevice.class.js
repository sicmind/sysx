export default class MIDIDevice{
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
        console.log(this.listeners)
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