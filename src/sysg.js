
const functionTags = {
    toggle: function(element){
    		element.onclick = function(){
    			let d = document.querySelector(this.getAttribute('dest'))
    			if(d.classList.contains(element.getAttribute('value'))){
    				d.classList.remove(element.getAttribute('value'));
    			}else{
    				d.classList.add(element.getAttribute('value'));
    			}
    		}
    },

    midiconsole: function(element){
        element.receive_message = function(msg){
            //console.log(msg);
            this.innerHTML += `<div class="${msg.message.type} ${msg.detail.status}" device="${msg.device}" type="${msg.detail.status}">${msg.message.data}</div>`;
            element.scrollTop = element.scrollHeight;
        }
        
        window.GLOBAL_MIDI_LISTENERS.push(element);
    }
}

var tags = [
    'midiconsole',
    'toggle',
];

for(t of tags){
    for(e of document.querySelectorAll(t)){
        functionTags[t](e);
    }
}
