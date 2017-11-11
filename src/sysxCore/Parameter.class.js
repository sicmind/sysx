export default class Parameter {
	constructor(label){
		this.label = label;
		this.control = null;
        this.com = new Event('com');
		//randome values for testing
        this.value = Math.floor(Math.random() * 99);
        this.displayValue = Math.floor(Math.random() * 99);
	}
	
    //connect parameter with GUI element
	bind_control(control){
		this.control = control;
		control.parameter = this;
		this.control.value = control.getAttribute('value');
	}
	
	setValue(val){
		this.value = val;
		this.update();
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