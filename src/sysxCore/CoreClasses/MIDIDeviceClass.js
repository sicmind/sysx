import { SchemaProcessor } from "../CoreModules/SchemaProcessor.js"

export class MIDIDevice {
    constructor( config ){
        this.config = config
        this.schema = config.schema
        this.channel = config.defaultChannel
    }

    ping(){
        console.log( `${this.config.device} is ready on channel ${this.channel}`)
    }
    
    register_controls( ElementList ){
        ElementList.forEach( el => {
            console.log(el)
        })
    }
} 