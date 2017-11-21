export default class Parameter {
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