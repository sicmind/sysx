import Instrument from './sysxCore/instrument.class';
import MIDIAccess from './sysxCore/MIDIAccess.class';


navigator.requestMIDIAccess({
    sysex: true
}).then( function(midiAccess){
        const io = new MIDIAccess(midiAccess);
}, this.onMIDIFailure );


const ts12 = new Instrument();
