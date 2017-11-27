import Sysx from './sysxCore/Sysx.class';
//import TS12 from './IntrumentDefinitions/EnsoniqTS12/TS12';

//Libraries
//const tsSample = require('./IntrumentDefinitions/EnsoniqTS12/sampleData.js');

window.GLOBAL_MIDI_LISTENERS = [];

navigator.requestMIDIAccess({
    //sysex: true
}).then( function(midiAccess){

   		window.sysx = new Sysx(midiAccess);
 
}, function(){
	console.log("MIDI access is not possible at this time");
} );    
    

