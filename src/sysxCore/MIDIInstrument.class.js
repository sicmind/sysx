export default class MIDIInstument{
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
        console.log(msg);
    }
}