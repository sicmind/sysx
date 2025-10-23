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

    init: () => {
        navigator.requestMIDIAccess({sysex:true}).then( MIDIEnvironment.build, MIDIEnvironment.on_access_fail)
    },

    on_access_fail(err){
        console.error(err)
    },

    build(access) {
        //console.log(access)
        MIDIEnvironment.access = access
        MIDIEnvironment.make_io_lists()
        //testing
        //MIDIEnvironment.toggle_input(MIDIEnvironment.available_inputs[3])
        //MIDIEnvironment.toggle_output(MIDIEnvironment.available_outputs[10])
    },

    make_io_lists: () =>{
        MIDIEnvironment.access.inputs.forEach( i => { MIDIEnvironment.available_inputs.push(i) })
        MIDIEnvironment.access.outputs.forEach( o => { MIDIEnvironment.available_outputs.push(o) })

    },
    
    toggle_input(input){
        console.log(input.name)
        if(input.onmidimessage != null){
            input.onmidimessage = null
        } else {
            input.onmidimessage = MIDIEnvironment.handle_midi_input
        }
    },

    toggle_output(output){
        console.log(output.name)
        if (MIDIEnvironment.active_outputs.includes(output)){
            MIDIEnvironment.active_outputs.remove(output)
        } else {
            MIDIEnvironment.active_outputs.push(output)
        }
    },

    handle_midi_input(msg){
        if(!MIDIEnvironment.midi_filter.includes(msg.data[0] >> 4)) {
            // console.log(msg.data)
            //MIDIEnvironment.send(msg.data)
                //m1.parameterChange(1,12,1,127)
                //m1.parameterChange(2,14,126,127)
        }
    },

    send(msg){
        MIDIEnvironment.active_outputs.forEach( o => {
            //console.log(o.name)
            o.send(msg)
        })
    }

}



