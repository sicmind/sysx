export default class Instrument{
	constructor(){
		this.parameters = [];
	}
	
	addParameterObject(pObj){
		for (let p in pObj){
			this.parameters[p] = pObj[p];
		}
	}
	
	bind_control(control, param){
		this.parameters[param].bind_control(control)
		this.parameters[param].update();
	}
}