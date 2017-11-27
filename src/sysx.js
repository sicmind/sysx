import Sysx from './sysxCore/Sysx.class';
//import TS12 from './IntrumentDefinitions/EnsoniqTS12/TS12';

//Libraries
const midispecs = require('./sysxCore/MIDISpecs.lib');
const tsSample = require('./IntrumentDefinitions/EnsoniqTS12/sampleData.js');


//Communication Event
//var com = new Event('com'); -> moved to Parameter
navigator.requestMIDIAccess({
    //sysex: true
}).then( function(midiAccess){
   		window.sysx = new Sysx(midiAccess);
 
}, function(){
	console.log("MIDI access is not possible at this time");
} );    
    

