/* !! Message output format to be an Object based on message template [header],[address],[value],[eox] */

export const SchemaProcessor = {

    init(schema){
        SchemaProcessor.schema = schema
        this.error = []
    },

    //helper functions
    list_templates(){
        return Object.keys(this.schema.message_templates)
    },

    list_parameters(){
        return Object.keys(this.schema.parameters)
    },

    get_param_def( parameter ){
        return this.schema.parameters[parameter]
    },

    get_table(tablename){
        return this.schema.tables[tablename]
    },

    make_message(details, schema){
        this.msg_obj = message_factory.fetch(details, schema)
        return this.msg_obj
    },
}

const message_factory = {
    spec : [
        {type: "pair", re: /(.+\s.+)/ }, //two components on same line 
        {type: "pair", re: /(.+\,.+)/ }, //two components on same line  (comma delim)
        {type: "partial", re: /\[(.+)\]/}, // [partial] uses an existing template as a partial 
        {type: "variable", re: /\{(.+)\}/}, // {variable} expects a parameter
        {type: "value", re: /\*(.+)\*/}, // *Value* position of editable value
        {type: "hex", re: /(0x\d{2})/} // 0xFF is a hardcoded hex value
    ],

    errors( err = "unknown error"){
        SchemaProcessor.error.push[err]
        console.log(`Oops: ${err}`)
    },

    fetch(details, schema){
        this.error = []
        this.message = {}
        this.current
        this.schema = schema
        this.data = details
        
        this.parse_template(details.template)
        //wrap up
        //this.message.push(this.current)
        return this.message
        //return {start: this.message[0], end: this.message[1]}
    },

    parse_template(template_name){
        const template = this.schema.message_templates[template_name] 
        try{
            template.split(/\r?\n/).forEach( component => {
                this.process_type(component)
            })
        } catch (err) { 
            this.error.push(`Cannot process message template ${err}`)
        } 
    },

    determine_type( component) {
        let type = "default"
        let name = component
        
        message_factory.spec.forEach( rule => {
            const match = component.match(rule.re)
            if(match) {
                        type = rule.type
                        name = match[1]
            }
       
        })
         return {name, type}
    },

    process_type( component ){
       

        const {type, name} =   this.determine_type(component)

        switch(type){
            case 'partial':
               this.message[name] = new Array()
    
               this.current = name
               this.parse_template(name)
            break;
            
            case 'variable': 
               if(this.data[name] === undefined){
                SchemaProcessor.error.push(`MESSAGE FACTORY: Expecting a value "${name}"`)
               } else {
               
               this.message[name] = new Array()
               this.message[name].push(this.data[name])
               }
            break;

            case 'pair':
                this.process_pair(name)
            break;

            case 'hex':
                this.message[this.current].push(parseInt(name, 16))
            break;

            case 'value':
                this.message[name] = undefined
            break;

            default:
                this.message[this.current].push(this.schema[name])
            break;
        }
    },

    process_pair(pair){
       
        const nibbles = []
        pair.split(' ').forEach( t => { //will need to make this work for all types of pairs
            const {name, type} = this.determine_type(t)
        
            switch(type){
                case 'variable': 
                    if(this.data[name] === undefined){
                        SchemaProcessor.error.push(`MESSAGE FACTORY: Expecting a value "${name}"`)
                    } else {
                        nibbles.current.push(this.data[name])
                    }
                break;

                default:    
                    nibbles.push(this.schema[name])
                break;
            }

        })
        const high = nibbles[0]
        const low = nibbles[1]
        const combined = high | low

        this.message[this.current].push(combined)
    }
}

