import {hex_to_nibbles} from '../Utilities/parameterScaler.js'
//console.log(hex_to_nibbles(256))
/*what a message build would look like
let val = [100,100]

const msg_obj = SP.make_message("PARAMETER_CHANGE", { page: 0, position:1, LSB:2, MSB:3})
if(msg_obj.err.length > 0){
    console.log(msg_obj.err)
}
msg_obj.msg.splice(msg_obj.idx, 0, val)
//console.log([...msg_obj.msg[0],...msg_obj.msg[1],...msg_obj.msg[2]])
*/

export const UIController = {
    init(schema_processor){
        this.SP = schema_processor
        this.error = []
    },

    bind_control( ctl , message_template, callback = null){
        //console.log(ctl.dataset)
        //! validate that the target control exists
        const target_parameter = this.SP.get_param_def(ctl.dataset.bind)
        if(target_parameter === undefined ){
            this.error.push(`BIND CONTROL ${ctl}: ${ctl.dataset.bind} not found in schema`)
            return
        }
        //! attach the UI element that will provide data changes
        ctl.querySelectorAll('[data-provider="true"]').forEach( (child) => {
            if(child.dataset.provider){
                //console.log(`${child.id} is a data provider`)
                child.parameter_change = UIController.ui_parameter_change_handler
                child.parameter_input = UIController.ui_parameter_input_handler
                child.parameter = ctl.dataset.bind
                ctl.provider = child
            } 
        })
        //! alert if no data provider is found
        //! todo: allow for a control to have mulitiple providers i.e. envelope controls
        if(ctl.provider === undefined) {
                this.error.push(`BIND CONTROL: Could not fine data provider for ${ctl.dataset.bind}`)
        } else {
            const provider = ctl.provider
            provider.addEventListener('input', provider.parameter_input)
            provider.addEventListener('changet', provider.parameter_change)
        }

        //! populate provider option values from schema
        
        //! connect appropriate range translator

        //! ask schema processor for message template
        
        const {start, end} = this.SP.make_message(message_template, target_parameter)
        ctl.provider.msg = {start, end}
        ctl.provider.valtype = target_parameter.valtype
        //console.log([...msg.start,...[0,0],...msg.end])

        //add callback to fire after message is created
        ctl.provider.callback = callback
    },

    bind_display( disp ){
       // console.log(disp)
    },

    ui_parameter_change_handler(provider){
        //console.log(`${provider.target.parameter} changed: ${provider.target.value}`)
        
    },
    
    ui_parameter_input_handler( event ){
        const provider = event.target
        provider.msg.val = UIController.scale_value(provider.value, provider.valtype) //
        //console.log(`${provider.target.parameter}: ${provider.target.value}`)
        const msg = UIController.flatten_message(provider.msg)
        if (provider.callback){ //!todo remove the default catch
            provider.callback(msg)
        }
        //console.log(msg)
    },

    scale_value(value, valtype){
        //to be implemented must convert value to schema defined
            return hex_to_nibbles(value)
    
    },

    //move to Utilities
    flatten_message( msg , valtype){
        return [...msg.start, ...msg.val, ...msg.end] 
    },

    populate_options(){ //popluate select lists with values from schema table

    }

}