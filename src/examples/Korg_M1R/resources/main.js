import { SYSX, ValueTools } from '../../../sysxCore/sysx.js'
import { Schema } from './schema.js'
/*
import { SYSX_UI } from '../../../../../sysx_ui/sysx_ui.js'

SYSX_UI.register([
  'port_manager',
])
*/

const config = [{
  name: 'm1r',
  device: 'Korg M1R',
  schema: Schema,
  parameterChange: 'PARAMETER_CHANGE',
  defaultChannel: 2,
  method: 'systemExclusive'
}]

//wait until HTML elements are loaded
document.addEventListener('DOMContentLoaded', async () => {
  try {
    /* 
     * Initialize SYSX with the configuration file.
     * Supply a callback to open the page to the user
    */
    SYSX.init( config , ready)
    
  } catch (error) {
    console.error('Error loading SYSX:', error);
  }
});

/////////////////////////////// UI Functions ///////////////////////////
let device_list 
const ready = ( devices ) => {
    device_list = devices
    document.querySelector('.loadscreen').classList.add('loaded')

    document.querySelectorAll('.control').forEach( ctl => {
        const providers = ctl.querySelectorAll('[data-provider]').forEach( provider => {
          
          //! populate table values
          provider.parameter_name = ctl.dataset.bind
          provider.details = device_list['m1r'].get_parameter_detail(provider.parameter_name)
          if(provider.details.valtype == 'table' && !provider.querySelector('option')){
            const value_list = device_list['m1r'].get_table_data(provider.details.table)
            if(value_list){
              provider.innerHTML = ''
              Object.keys(value_list).forEach( (key) => {
                const opt = document.createElement('option')
                opt.value = key
                opt.innerText = value_list[key]
                provider.appendChild(opt)
              })
            } else {
              console.error(`Data Table not found for ${provider.parameter_name}`)
            }
          }


          //handle input events
          provider.addEventListener('input', (evt) => {
            handle_value_change(evt.target)
          })
      })
      
    })
    //devices['m1r'].ping()
}

const handle_value_change = ( provider ) => {
  //! modify value
  const data = {
    param: provider.parameter_name,
    value: ValueTools.split_to_nibbles(provider.value),
    ...provider.details
  }
  //console.table(data)
  temp_view_message( device_list['m1r'].get_message_object( 'send_parameter',data.param, data) )
}

const temp_view_message = ( msg) =>{
    let arr = []
    for( let i in msg){
      arr = arr.concat(msg[i])
    }
    console.log([...arr])
}

//! If 'osc_mode' changes, we need to remap the 'page' prop of all parameters
document.querySelector('#osc-mode-select').addEventListener('change', (evt) => {
  console.log(evt.target.value)
})