import { MIDIDevice } from "./CoreClasses/MIDIDeviceClass.js"
import { MIDIEnvironment as MIDI } from "./CoreModules/MIDIEnvironment.js"
import { UIController } from "./CoreModules/UIController.js"


export const SYSX = {
    init( config,  callback = undefined ){
        
         const devices = {}
         config.forEach( (device) => {
            {
                devices[device.name] = new MIDIDevice(device)
            }
         })

        //MIDI.init()
        //UI element init

        //return device list for UI manipulation
        if(callback != undefined) {
            callback( devices ) 
        }
        
    },
}

export const Utilities = {

}

export const SYXFileProcessor = {

}
