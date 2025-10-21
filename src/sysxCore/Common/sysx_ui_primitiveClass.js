export class UI_Primitive extends HTMLElement {
    constructor(){
        super()
    }

    connectedCallback(){
        const shadow = this.attachShadow({ mode: "open" })
        const container = document.createElement('div')
        container.innerHTML = `<small>[This will be the port selector]</small>`

        shadow.appendChild(container)
    }

}
