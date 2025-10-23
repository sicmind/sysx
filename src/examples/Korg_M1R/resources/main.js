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
    const { SYSX } = await import('../../../sysxCore/sysx.js');
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

const ready = ( devices ) => {
    document.querySelector('.loadscreen').classList.add('loaded')
    devices['m1r'].ping()
    devices['m1r'].send('send_parameter', { address: 'basic_oscMode', page:1, value:1 })
    //devices['m1r'].register_controls( document.querySelectorAll('.control'))
}

//! If 'osc_mode' changes, we need to remap the 'page' prop of all parameters
document.querySelector('#osc-mode-select').addEventListener('change', (evt) => {
  console.log(evt.target.value)
})