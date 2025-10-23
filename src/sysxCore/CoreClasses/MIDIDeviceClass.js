import { SchemaProcessor as SP } from "../CoreModules/SchemaProcessor.js"

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
            //console.log(el)
        })
    }

    send( message , ...data ){
        //verify command exists in spec
        const msg = this.schema.messages[message] || 0
        if(msg === 0 ){
            console.log('error')
            return
        }
        console.log('INCOMING REQUEST')
        console.table(msg)
        //process message template if not already
        if( msg.template){
            console.log('MAKE MESSAGE')
            console.table(SP.make_message(this.schema, msg.template, data))
        }
        //change any values that need changing
        //send over midi
        console.log('ORIGINAL DATA')
        console.table(data)
        
        //console.log(SP.make_message(template,))
    }
} 