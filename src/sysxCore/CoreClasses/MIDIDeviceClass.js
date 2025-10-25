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
    
    get_parameter_detail( parameter_name ){
        return this.schema.parameters[parameter_name]
    }

    get_table_data( table_name ){
        return {...this.schema.tables[table_name]}
    }

    get_message_object( message_type, message_name , data ){
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
            return msg_obj
        } else { //if exists, just update incomming values 
            let msg_obj = {...this.message_objects[message_name], ...data}
            return msg_obj
        }

    }

} 