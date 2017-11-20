import MIDIAccess from './sysxCore/MIDIAccess.class';
import Instrument from './sysxCore/Instrument.class';
import Parameter from './sysxCore/Parameter.class';
import ui from './interface/ui';

//************testing**************//

//Communication Event
//var com = new Event('com'); -> moved to Parameter

navigator.requestMIDIAccess({
    sysex: true
}).then( function(midiAccess){
        const io = new MIDIAccess(midiAccess);
//let's create a few example parameters
	var lfo = {
		lfoshape:  new Parameter('lfoshape'),
		lforate:   new Parameter('lforate'),
		lfoamount: new Parameter('lfoamount'),
		lfospeed:  new Parameter('lfospeed'),
		lfodelay:  new Parameter('lfodelay')
	}
	
	var env1 = {
		env1attack:  new Parameter('env1attack'),
		env1decay:   new Parameter('env1decay'),
		env1sustain: new Parameter('env1sustain'),
		env1release:  new Parameter('env1release')
	}
	
//and an example instrument to hold the parameters
	const MidiKeyboard = new Instrument();
	MidiKeyboard.addParameterObject(lfo);
	MidiKeyboard.addParameterObject(env1);

//scrape the html for all controls	
	var controls = document.getElementsByClassName('control');
	for(let control of controls){
		MidiKeyboard.bind_control(control,control.getAttribute('param'));
		control.onmousedown = function(e){
			if(e.offsetY > (control.clientHeight/2)){
				control.parameter.value --;
			}else{
				control.parameter.value ++;
			}
			control.parameter.update();
		}
		control.addEventListener('com', function(){
			control.innerHTML = control.parameter.value;
		})
		control.parameter.update();
	}

    var messageWindow = document.querySelector("#messageWindow");
    messageWindow.receive_message = function(msg){
        console.log(msg);
        
        if(typeof(msg) === 'object' && msg.type == 'midimessage'){
					let r = "";
					for(let b of msg.data){
						r += b + ", ";
					}
					msg = r;
        }
        
        let d = document.createElement('div');
        d.innerHTML = msg;
        d.classList.add("midimessage");
        messageWindow.appendChild(d);
        messageWindow.scrollTop = messageWindow.scrollHeight;
    }
    for(let i of io.listInputs()){
        messageWindow.receive_message(i);
    }; 
    console.log(io.listOutputs());
    io.inputs['IAC Driver Bus 1'].addListener(messageWindow);
    
}, this.onMIDIFailure );    
    

