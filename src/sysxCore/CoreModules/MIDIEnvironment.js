 const status_codes = {
            noteOff : 8,
            noteOn: 9,
            pressure : 10,
            controller : 11,
            programchange : 12,
            channelpressure : 13,
            pitchwheel : 14,
            system : 15
        }


export const MIDIEnvironment = {
    available_inputs: [],
    available_outputs: [],
    active_outputs: [],

    midi_filter: [ status_codes.system, status_codes.noteOff ],

    init: (access) => {
        navigator.requestMIDIAccess({sysex:true}, ).then( (MIDIAccess) => {
        MIDI_Environment.build(MIDIAccess)
        })
    },

    build(access) {
        MIDI_Environment.access = access
        MIDI_Environment.make_io_lists()
        //testing
        //MIDI_Environment.toggle_input(MIDI_Environment.available_inputs[3])
        //MIDI_Environment.toggle_output(MIDI_Environment.available_outputs[10])
    },

    make_io_lists: () =>{
        MIDI_Environment.access.inputs.forEach( i => { MIDI_Environment.available_inputs.push(i) })
        MIDI_Environment.access.outputs.forEach( o => { MIDI_Environment.available_outputs.push(o) })
    },
    
    toggle_input(input){
        console.log(input.name)
        if(input.onmidimessage != null){
            input.onmidimessage = null
        } else {
            input.onmidimessage = MIDI_Environment.handle_midi_input
        }
    },

    toggle_output(output){
        console.log(output.name)
        if (MIDI_Environment.active_outputs.includes(output)){
            MIDI_Environment.active_outputs.remove(output)
        } else {
            MIDI_Environment.active_outputs.push(output)
        }
    },

    handle_midi_input(msg){
        if(!MIDI_Environment.midi_filter.includes(msg.data[0] >> 4)) {
            // console.log(msg.data)
            //MIDI_Environment.send(msg.data)
                //m1.parameterChange(1,12,1,127)
                //m1.parameterChange(2,14,126,127)
        }
    },

    send(msg){
        MIDI_Environment.active_outputs.forEach( o => {
            //console.log(o.name)
            o.send(msg)
        })
    }

}



