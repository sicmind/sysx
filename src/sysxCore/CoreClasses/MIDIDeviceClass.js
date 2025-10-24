import { SchemaProcessor as SP } from "../CoreModules/SchemaProcessor.js"

export class MIDIDevice {
    constructor( config ){
        this.config = config
        this.schema = config.schema
        this.channel = config.defaultChannel

        this.message_objects = {}
    }

    ping(){
        console.log( `${this.config.device} is ready on channel ${this.channel}`)
    }
    
    register_controls( ElementList ){
        ElementList.forEach( el => {
            //console.log(el)
        })
    }

    send( message_type, message_name, data ){
        
        //verify command exists in spec
        const req = this.schema.messages[message_type] || 0
        if(req === 0 ){
            console.log('error')
            return
        }

       
        //process message template if not already
        if(!this.message_objects[message_name]){
            
            const message_details = {
                ...req,
                name: message_name,
                ...this.schema[req.source][message_name],
                ...data
            }
            let msg_obj = SP.make_message(message_details, this.schema)
            this.message_objects[message_name]
            console.table(msg_obj)
        } else {
            let msg_obj = {...this.message_objects[message_name], ...data}
            console.table(msg_obj)
        }
            
        //if exists, just update incomming values 
        
        //else we need to create a new one

        //change any values that need changing
        //send over midi

    }

} 