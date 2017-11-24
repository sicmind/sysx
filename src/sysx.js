import MIDIAccess from './sysxCore/MIDIAccess.class';
import MIDIInstrument from './sysxCore/MIDIInstrument.class';
import Parameter from './sysxCore/Parameter.class';
import TS12 from './IntrumentDefinitions/EnsoniqTS12/TS12';

//Libraries
const midispecs = require('./sysxCore/MIDISpecs.lib');
const tsSample = require('./IntrumentDefinitions/EnsoniqTS12/sampleData.js');

//************testing**************//


//Communication Event
//var com = new Event('com'); -> moved to Parameter
navigator.requestMIDIAccess({
    sysex: true
}).then( function(midiAccess){
    console.log("let's go");

    const io = new MIDIAccess(midiAccess);
    //first, lets look up the header for our instrument
    const header = tsSample.TS_header;
    //then construct the instrument
    const ts12 = new TS12(header);
    
        for(let p of tsSample.TS_params ){
            ts12.addParameterObject(new Parameter(p));
        }
        window.ts12 = ts12;
       // ts12.addParameterObject(tsSample.TS_params);
/*let's create a few example parameters
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
	const MidiKeyboard = new MIDIInstrument();
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
*/
    //some debuging/test tools
    //@TODO build gui funciton lib
       const devices = document.createElement('div');
       devices.innerHTML = "Devices";
       for(let i of io.listInputs() ){
           let d = document.createElement('div');
           d.setAttribute('device',i);
           d.setAttribute('direction','input');
           d.className = 'deviceOption in';
           d.innerHTML = i;
           d.addEventListener('click', activateDevice)
           devices.appendChild(d);
       }
       
      // devices.innerHTML += "<div class='subhead'>outputs</div>";
       
       for(let i of io.listOutputs() ){
           let d = document.createElement('div');
           d.setAttribute('device',i);
           d.setAttribute('direction','output');
           d.className = 'deviceOption out';
           d.innerHTML = i;
           d.addEventListener('click', activateDevice)
           devices.appendChild(d);
       }
       
       document.body.insertBefore(devices, document.body.firstChild);
       

       
    var messageWindow = document.querySelector("#messageWindow");
    messageWindow.receive_message = function(msg){
        
        console.log(msg);
        let classname = "undefined";
        let messageType = '';
        if(typeof(msg) === 'object' && msg.type == 'midimessage'){
			 messageType = midispecs.MidiMessageType[ msg.data[0] ] ;
            
            
            let r = messageType+": ";
			for(let b of msg.data){
				r += b + ", ";
			}
			msg = r;
            
        }
        
        let d = document.createElement('div');
        d.innerHTML = msg;
        d.classList.add("midimessage");
        d.classList.add(messageType);
        messageWindow.appendChild(d);
        messageWindow.scrollTop = messageWindow.scrollHeight;
    }

    
    window.log = function(msg){
        messageWindow.receive_message(msg);
    }
     
    function activateDevice(e){
        if (e.target.classList.contains('active')){
            if( e.target.getAttribute('direction') =='input') {
              io.inputs[e.target.getAttribute('device')].removeListener(messageWindow);
               }
           if( e.target.getAttribute('direction') =='output') {
                   io.outputs[e.target.getAttribute('device')].removeListener(messageWindow);
                     }   
            e.target.classList.remove('active');
            
            
        }else{
           if( e.target.getAttribute('direction') =='input') {
             io.inputs[e.target.getAttribute('device')].addListener(messageWindow);
              }
           if( e.target.getAttribute('direction') =='output') {
               io.outputs[e.target.getAttribute('device')].addListener(messageWindow);
                 }   
              
             e.target.classList.add('active')
        }
    }
     
    
}, this.onMIDIFailure );    
    

