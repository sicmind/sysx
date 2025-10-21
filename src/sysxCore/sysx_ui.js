import {UI_Primitive} from './Common/sysx_ui_primitiveClass.js'

export const SYSX_UI = {
    elementsAvailable: [],
    elementsRegistered: [],
    register: ( elements ) => {
        const element = 'port_manager'
        const className = UI_Primitive
        customElements.define(`sysx-${element}`, className );
    }
}
