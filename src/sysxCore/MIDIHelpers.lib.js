module.exports = {

    statusBytes: {
    	0x00: 'InvalidType'          ,    
    	0x80: 'NoteOff'              ,    
    	0x90: 'NoteOn'               ,    
    	0xA0: 'AfterTouchPoly'       ,    
    	0xB0: 'ControlChange'        ,    
    	0xC0: 'ProgramChange'        ,    
    	0xD0: 'AfterTouchChannel'    ,    
    	0xE0: 'PitchBend'            ,    
    	0xF0: 'SystemExclusive'      ,    
    	0xF1: 'TimeCodeQuarterFrame' ,    
    	0xF2: 'SongPosition'         ,    
    	0xF3: 'SongSelect'           ,    
    	0xF6: 'TuneRequest'          ,    
    	0xF8: 'Clock'                ,    
    	0xFA: 'Start'                ,    
    	0xFB: 'Continue'             ,    
    	0xFC: 'Stop'                 ,    
    	0xFE: 'ActiveSensing'        ,    
    	0xFF: 'SystemReset'          ,    
    },
    
    get_type(hex){
        let s = this.to_nibbles(hex);
        if (s[0] >= 0 && s[0] <= 0xE){
            return { 
                status: this.statusBytes[s[0] << 4],
                channel: s[1]
            }
        }
    },

    to_nibbles: function(hex){
        return [ (hex & 0xF0) >> 4 , hex & 0x0F ];
    }

}

