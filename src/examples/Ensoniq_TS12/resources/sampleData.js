//this will be from a database
module.exports = {

TS_params:[
 {
   "ID": 1,
   "Object": "LFO",
   "pg": 25,
   "s1": 0,
   "mi": "00",
   "off": 76,
   "type": "Pos Int",
   "label": "LFO Rate",
   "internal": "0,99",
   "displayed": "00,99"
 },
 {
   "ID": 2,
   "Object": "LFO",
   "pg": 25,
   "s1": 0,
   "mi": "01",
   "off": 76,
   "type": "Bit Table(7)",
   "label": "Track Rate Mod",
   "internal": "0,1",
   "displayed": "Size(1)"
 },
 {
   "ID": 3,
   "Object": "LFO",
   "pg": 25,
   "s1": 1,
   "mi": "x",
   "off": 74,
   "type": "TableLo",
   "label": "rate modsrc",
   "internal": "0,15",
   "displayed": "Size(5)"
 },
 {
   "ID": 4,
   "Object": "LFO",
   "pg": 25,
   "s1": 2,
   "mi": "x",
   "off": 75,
   "type": "Signed Frac",
   "label": "rate modeamt",
   "internal": "-127127",
   "displayed": "00,99"
 },
 {
   "ID": 5,
   "Object": "LFO",
   "pg": 25,
   "s1": 3,
   "mi": "x",
   "off": 73,
   "type": "Pos Frac",
   "label": "depth",
   "internal": "0,127",
   "displayed": "00,99"
 },
 {
   "ID": 6,
   "Object": "LFO",
   "pg": 25,
   "s1": 4,
   "mi": "x",
   "off": 71,
   "type": "TableLo",
   "label": "depth modsrc",
   "internal": "0,15",
   "displayed": "Size(5)"
 },
 {
   "ID": 7,
   "Object": "LFO",
   "pg": 25,
   "s1": 5,
   "mi": "x",
   "off": 72,
   "type": "Signed Frac",
   "label": "depth modamt",
   "internal": "-127127",
   "displayed": "-99,99"
 },
 {
   "ID": 8,
   "Object": "LFO",
   "pg": 26,
   "s1": 1,
   "mi": "x",
   "off": 71,
   "type": "TableHi",
   "label": "waveshape",
   "internal": "0,6",
   "displayed": "Size(8)"
 },
 {
   "ID": 9,
   "Object": "LFO",
   "pg": 26,
   "s1": 2,
   "mi": "x",
   "off": 74,
   "type": "TableHi",
   "label": "restart-mode",
   "internal": "0,1",
   "displayed": "Size(3)"
 },
 {
   "ID": 10,
   "Object": "LFO",
   "pg": 26,
   "s1": 3,
   "mi": "x",
   "off": 78,
   "type": "Unsigned Int",
   "label": "phase",
   "internal": "0,255",
   "displayed": "000,255"
 },
 {
   "ID": 11,
   "Object": "LFO",
   "pg": 26,
   "s1": 4,
   "mi": "x",
   "off": 77,
   "type": "unsigned Int",
   "label": "delay",
   "internal": "0,99",
   "displayed": "00,99"
 },
 {
   "ID": 12,
   "Object": "LFO",
   "pg": 26,
   "s1": 5,
   "mi": "x",
   "off": 87,
   "type": "Pos Frac",
   "label": "noise-rate",
   "internal": "0,127",
   "displayed": "00,99"
 },
 {
   "ID": 13,
   "Object": "ENV1",
   "pg": 27,
   "s1": 1,
   "mi": "00",
   "off": 1,
   "type": "Pos Int",
   "label": "attack",
   "internal": "0,99",
   "displayed": "00,99"
 },
 {
   "ID": 14,
   "Object": "ENV1",
   "pg": 27,
   "s1": 1,
   "mi": "01",
   "off": 1,
   "type": "Bit Table(7)",
   "label": "track attack mod",
   "internal": "0,1",
   "displayed": "Size(1)"
 },
 {
   "ID": 15,
   "Object": "ENV1",
   "pg": 27,
   "s1": 2,
   "mi": "x",
   "off": 3,
   "type": "Unsigned Int",
   "label": "decay 1",
   "internal": "0,99",
   "displayed": "00,99"
 },
 {
   "ID": 16,
   "Object": "ENV1",
   "pg": 27,
   "s1": 3,
   "mi": "x",
   "off": 5,
   "type": "Unsigned Int",
   "label": "decay 2",
   "internal": "0,99",
   "displayed": "00,99"
 },
 {
   "ID": 17,
   "Object": "ENV1",
   "pg": 27,
   "s1": 4,
   "mi": "x",
   "off": 7,
   "type": "unsigned Int",
   "label": "decay 3",
   "internal": "0,99",
   "displayed": "00,99"
 },
 {
   "ID": 18,
   "Object": "ENV1",
   "pg": 27,
   "s1": 5,
   "mi": "00",
   "off": 0,
   "type": "Pos Int",
   "label": "release",
   "internal": "0,99",
   "displayed": "00,99"
 },
 {
   "ID": 19,
   "Object": "ENV1",
   "pg": 27,
   "s1": 5,
   "mi": "01",
   "off": 9,
   "type": "Bit Table(7)",
   "label": "track release mod",
   "internal": "0,1",
   "displayed": "Size(1)"
 },
 {
   "ID": 20,
   "Object": "ENV1",
   "pg": 28,
   "s1": 1,
   "mi": "x",
   "off": 2,
   "type": "Pos Frac",
   "label": "peak",
   "internal": "0,127",
   "displayed": "00,99"
 },
 {
   "ID": 21,
   "Object": "ENV1",
   "pg": 28,
   "s1": 2,
   "mi": "x",
   "off": 4,
   "type": "Pos Frac",
   "label": "break 1",
   "internal": "0,127",
   "displayed": "00,99"
 },
 {
   "ID": 22,
   "Object": "ENV1",
   "pg": 28,
   "s1": 3,
   "mi": "x",
   "off": 5,
   "type": "Pos Frac",
   "label": "break 2",
   "internal": "0,127",
   "displayed": "00,99"
 },
 {
   "ID": 23,
   "Object": "ENV1",
   "pg": 28,
   "s1": 4,
   "mi": "x",
   "off": 8,
   "type": "Pos Frac",
   "label": "sustain",
   "internal": "0,127",
   "displayed": "00,99"
 },
 {
   "ID": 24,
   "Object": "ENV1",
   "pg": 28,
   "s1": 5,
   "mi": "x",
   "off": 10,
   "type": "Pos Frac",
   "label": "vel-lev",
   "internal": "0,127",
   "displayed": "00,99"
 },
 {
   "ID": 25,
   "Object": "ENV1",
   "pg": 29,
   "s1": 0,
   "mi": "x",
   "off": 13,
   "type": "TableHi",
   "label": "mode",
   "internal": "0,2",
   "displayed": "size(6)"
 },
 {
   "ID": 26,
   "Object": "ENV1",
   "pg": 29,
   "s1": 2,
   "mi": "x",
   "off": 13,
   "type": "TableLo",
   "label": "vel-curve",
   "internal": "0,99",
   "displayed": "Size(8)"
 },
 {
   "ID": 27,
   "Object": "ENV1",
   "pg": 29,
   "s1": 3,
   "mi": "x",
   "off": 12,
   "type": "Signed Frac",
   "label": "kbdtrack",
   "internal": "-127,127",
   "displayed": "-99,99"
 },
 {
   "ID": 28,
   "Object": "ENV1",
   "pg": 29,
   "s1": 4,
   "mi": "x",
   "off": 11,
   "type": "Pos Frac",
   "label": "vel-attack",
   "internal": "0,127",
   "displayed": "00,99"
 },
 {
   "ID": 29,
   "Object": "ENV1",
   "pg": 29,
   "s1": 5,
   "mi": "x",
   "off": 0,
   "type": "Signed Frac",
   "label": "vel-rlease",
   "internal": "-128,127",
   "displayed": "-99,99"
 },
 {
   "ID": 30,
   "Object": "ENV2",
   "pg": 30,
   "s1": 1,
   "mi": "00",
   "off": 15,
   "type": "Pos Int",
   "label": "attack",
   "internal": "0,99",
   "displayed": "00,99"
 },
 {
   "ID": 31,
   "Object": "ENV2",
   "pg": 30,
   "s1": 1,
   "mi": "01",
   "off": 15,
   "type": "bit Table(7)",
   "label": "track attack mod",
   "internal": "0,1",
   "displayed": "Size(1)"
 },
 {
   "ID": 32,
   "Object": "ENV2",
   "pg": 30,
   "s1": 2,
   "mi": "x",
   "off": 17,
   "type": "unsigned Int",
   "label": "decay 1",
   "internal": "0,99",
   "displayed": "00,99"
 },
 {
   "ID": 33,
   "Object": "ENV2",
   "pg": 30,
   "s1": 3,
   "mi": "x",
   "off": 19,
   "type": "unsigned Int",
   "label": "decay 2",
   "internal": "0,99",
   "displayed": "00,99"
 },
 {
   "ID": 34,
   "Object": "ENV2",
   "pg": 30,
   "s1": 4,
   "mi": "x",
   "off": 21,
   "type": "unsigned Int",
   "label": "decay 3",
   "internal": "0,99",
   "displayed": "00,99"
 },
 {
   "ID": 35,
   "Object": "ENV2",
   "pg": 30,
   "s1": 5,
   "mi": "00",
   "off": 23,
   "type": "Pos Int",
   "label": "relase",
   "internal": "0,99",
   "displayed": "00,99"
 },
 {
   "ID": 36,
   "Object": "ENV2",
   "pg": 30,
   "s1": 5,
   "mi": "01",
   "off": 23,
   "type": "bit Table(7)",
   "label": "track release mod",
   "internal": "0,1",
   "displayed": "Size(1)"
 },
 {
   "ID": 37,
   "Object": "ENV2",
   "pg": 31,
   "s1": 1,
   "mi": "x",
   "off": 2,
   "type": "Pos Frac",
   "label": "peak",
   "internal": "0,127",
   "displayed": "00,99"
 },
 {
   "ID": 38,
   "Object": "ENV2",
   "pg": 31,
   "s1": 2,
   "mi": "x",
   "off": 4,
   "type": "Pos Frac",
   "label": "break 1",
   "internal": "0,127",
   "displayed": "00,99"
 },
 {
   "ID": 39,
   "Object": "ENV2",
   "pg": 31,
   "s1": 3,
   "mi": "x",
   "off": 5,
   "type": "Pos Frac",
   "label": "break 2",
   "internal": "0,127",
   "displayed": "00,99"
 },
 {
   "ID": 40,
   "Object": "ENV2",
   "pg": 31,
   "s1": 4,
   "mi": "x",
   "off": 8,
   "type": "Pos Frac",
   "label": "sustain",
   "internal": "0,127",
   "displayed": "00,99"
 },
 {
   "ID": 41,
   "Object": "ENV2",
   "pg": 31,
   "s1": 5,
   "mi": "x",
   "off": 10,
   "type": "Pos Frac",
   "label": "vel-lev",
   "internal": "0,127",
   "displayed": "00,99"
 },
 {
   "ID": 42,
   "Object": "ENV2",
   "pg": 32,
   "s1": 0,
   "mi": "x",
   "off": 13,
   "type": "TableHi",
   "label": "mode",
   "internal": "0,2",
   "displayed": "size(6)"
 },
 {
   "ID": 43,
   "Object": "ENV2",
   "pg": 32,
   "s1": 2,
   "mi": "x",
   "off": 13,
   "type": "TableLo",
   "label": "vel-curve",
   "internal": "0,99",
   "displayed": "Size(8)"
 },
 {
   "ID": 44,
   "Object": "ENV2",
   "pg": 32,
   "s1": 3,
   "mi": "x",
   "off": 12,
   "type": "Signed Frac",
   "label": "kbdtrack",
   "internal": "-127,127",
   "displayed": "-99,99"
 },
 {
   "ID": 45,
   "Object": "ENV2",
   "pg": 32,
   "s1": 4,
   "mi": "x",
   "off": 11,
   "type": "Pos Frac",
   "label": "vel-attack",
   "internal": "0,127",
   "displayed": "00,99"
 },
 {
   "ID": 46,
   "Object": "ENV2",
   "pg": 32,
   "s1": 5,
   "mi": "x",
   "off": 0,
   "type": "Signed Frac",
   "label": "vel-rlease",
   "internal": "-128,127",
   "displayed": "-99,99"
 },
 {
   "ID": 47,
   "Object": "ENV3",
   "pg": 33,
   "s1": 1,
   "mi": "00",
   "off": 15,
   "type": "Pos Int",
   "label": "attack",
   "internal": "0,99",
   "displayed": "00,99"
 },
 {
   "ID": 48,
   "Object": "ENV3",
   "pg": 33,
   "s1": 1,
   "mi": "01",
   "off": 15,
   "type": "bit Table(7)",
   "label": "track attack mod",
   "internal": "0,1",
   "displayed": "Size(1)"
 },
 {
   "ID": 49,
   "Object": "ENV3",
   "pg": 33,
   "s1": 2,
   "mi": "x",
   "off": 17,
   "type": "unsigned Int",
   "label": "decay 1",
   "internal": "0,99",
   "displayed": "00,99"
 },
 {
   "ID": 50,
   "Object": "ENV3",
   "pg": 33,
   "s1": 3,
   "mi": "x",
   "off": 19,
   "type": "unsigned Int",
   "label": "decay 2",
   "internal": "0,99",
   "displayed": "00,99"
 },
 {
   "ID": 51,
   "Object": "ENV3",
   "pg": 33,
   "s1": 4,
   "mi": "x",
   "off": 21,
   "type": "unsigned Int",
   "label": "decay 3",
   "internal": "0,99",
   "displayed": "00,99"
 },
 {
   "ID": 52,
   "Object": "ENV3",
   "pg": 33,
   "s1": 5,
   "mi": "00",
   "off": 23,
   "type": "Pos Int",
   "label": "relase",
   "internal": "0,99",
   "displayed": "00,99"
 },
 {
   "ID": 53,
   "Object": "ENV3",
   "pg": 33,
   "s1": 5,
   "mi": "01",
   "off": 23,
   "type": "bit Table(7)",
   "label": "track release mod",
   "internal": "0,1",
   "displayed": "Size(1)"
 },
 {
   "ID": 54,
   "Object": "ENV3",
   "pg": 34,
   "s1": 1,
   "mi": "x",
   "off": 2,
   "type": "Pos Frac",
   "label": "peak",
   "internal": "0,127",
   "displayed": "00,99"
 },
 {
   "ID": 55,
   "Object": "ENV3",
   "pg": 34,
   "s1": 2,
   "mi": "x",
   "off": 4,
   "type": "Pos Frac",
   "label": "break 1",
   "internal": "0,127",
   "displayed": "00,99"
 },
 {
   "ID": 56,
   "Object": "ENV3",
   "pg": 34,
   "s1": 3,
   "mi": "x",
   "off": 5,
   "type": "Pos Frac",
   "label": "break 2",
   "internal": "0,127",
   "displayed": "00,99"
 },
 {
   "ID": 57,
   "Object": "ENV3",
   "pg": 34,
   "s1": 4,
   "mi": "x",
   "off": 8,
   "type": "Pos Frac",
   "label": "sustain",
   "internal": "0,127",
   "displayed": "00,99"
 },
 {
   "ID": 58,
   "Object": "ENV3",
   "pg": 34,
   "s1": 5,
   "mi": "x",
   "off": 10,
   "type": "Pos Frac",
   "label": "vel-lev",
   "internal": "0,127",
   "displayed": "00,99"
 },
 {
   "ID": 59,
   "Object": "ENV3",
   "pg": 35,
   "s1": 0,
   "mi": "x",
   "off": 13,
   "type": "TableHi",
   "label": "mode",
   "internal": "0,2",
   "displayed": "size(6)"
 },
 {
   "ID": 60,
   "Object": "ENV3",
   "pg": 35,
   "s1": 2,
   "mi": "x",
   "off": 13,
   "type": "TableLo",
   "label": "vel-curve",
   "internal": "0,99",
   "displayed": "Size(8)"
 },
 {
   "ID": 61,
   "Object": "ENV3",
   "pg": 35,
   "s1": 3,
   "mi": "x",
   "off": 12,
   "type": "Signed Frac",
   "label": "kbdtrack",
   "internal": "-127,127",
   "displayed": "-99,99"
 },
 {
   "ID": 62,
   "Object": "ENV3",
   "pg": 35,
   "s1": 4,
   "mi": "x",
   "off": 11,
   "type": "Pos Frac",
   "label": "vel-attack",
   "internal": "0,127",
   "displayed": "00,99"
 },
 {
   "ID": 63,
   "Object": "ENV3",
   "pg": 35,
   "s1": 5,
   "mi": "x",
   "off": 0,
   "type": "Signed Frac",
   "label": "vel-rlease",
   "internal": "-128,127",
   "displayed": "-99,99"
 }
],
TS_header: { 
    "ENSONIQ Code"          : 0x0F,
    "TS FAmily ID Code"     : 0x07,
    "Model ID"              : 0x00,
    "Device ID"             : 0x00,
    "MessageType"           : 0x00
},
TS_controls :[
 {
   "ID": 1,
   "label": "LFO Rate",
   "ParamID": 1,
   "Object": "range"
 },
 {
   "ID": 2,
   "label": "rate modeamt",
   "ParamID": 4,
   "Object": "range"
 },
 {
   "ID": 3,
   "label": "depth",
   "ParamID": 5,
   "Object": "range"
 },
 {
   "ID": 4,
   "label": "depth modamt",
   "ParamID": 7,
   "Object": "range"
 },
 {
   "ID": 5,
   "label": "phase",
   "ParamID": 10,
   "Object": "range"
 },
 {
   "ID": 6,
   "label": "delay",
   "ParamID": 11,
   "Object": "range"
 },
 {
   "ID": 7,
   "label": "noise-rate",
   "ParamID": 12,
   "Object": "range"
 },
 {
   "ID": 8,
   "label": "attack",
   "ParamID": 13,
   "Object": "range"
 },
 {
   "ID": 9,
   "label": "decay 1",
   "ParamID": 15,
   "Object": "range"
 },
 {
   "ID": 10,
   "label": "decay 2",
   "ParamID": 16,
   "Object": "range"
 },
 {
   "ID": 11,
   "label": "decay 3",
   "ParamID": 17,
   "Object": "range"
 },
 {
   "ID": 12,
   "label": "release",
   "ParamID": 18,
   "Object": "range"
 },
 {
   "ID": 13,
   "label": "peak",
   "ParamID": 20,
   "Object": "range"
 },
 {
   "ID": 14,
   "label": "break 1",
   "ParamID": 21,
   "Object": "range"
 },
 {
   "ID": 15,
   "label": "break 2",
   "ParamID": 22,
   "Object": "range"
 },
 {
   "ID": 16,
   "label": "sustain",
   "ParamID": 23,
   "Object": "range"
 },
 {
   "ID": 17,
   "label": "vel-lev",
   "ParamID": 24,
   "Object": "range"
 },
 {
   "ID": 18,
   "label": "kbdtrack",
   "ParamID": 27,
   "Object": "range"
 },
 {
   "ID": 19,
   "label": "vel-attack",
   "ParamID": 28,
   "Object": "range"
 },
 {
   "ID": 20,
   "label": "vel-rlease",
   "ParamID": 29,
   "Object": "range"
 },
 {
   "ID": 21,
   "label": "attack",
   "ParamID": 30,
   "Object": "range"
 },
 {
   "ID": 22,
   "label": "decay 1",
   "ParamID": 32,
   "Object": "range"
 },
 {
   "ID": 23,
   "label": "decay 2",
   "ParamID": 33,
   "Object": "range"
 },
 {
   "ID": 24,
   "label": "decay 3",
   "ParamID": 34,
   "Object": "range"
 },
 {
   "ID": 25,
   "label": "relase",
   "ParamID": 35,
   "Object": "range"
 },
 {
   "ID": 26,
   "label": "peak",
   "ParamID": 37,
   "Object": "range"
 },
 {
   "ID": 27,
   "label": "break 1",
   "ParamID": 38,
   "Object": "range"
 },
 {
   "ID": 28,
   "label": "break 2",
   "ParamID": 39,
   "Object": "range"
 },
 {
   "ID": 29,
   "label": "sustain",
   "ParamID": 40,
   "Object": "range"
 },
 {
   "ID": 30,
   "label": "vel-lev",
   "ParamID": 41,
   "Object": "range"
 },
 {
   "ID": 31,
   "label": "kbdtrack",
   "ParamID": 44,
   "Object": "range"
 },
 {
   "ID": 32,
   "label": "vel-attack",
   "ParamID": 45,
   "Object": "range"
 },
 {
   "ID": 33,
   "label": "vel-rlease",
   "ParamID": 46,
   "Object": "range"
 },
 {
   "ID": 34,
   "label": "attack",
   "ParamID": 47,
   "Object": "range"
 },
 {
   "ID": 35,
   "label": "decay 1",
   "ParamID": 49,
   "Object": "range"
 },
 {
   "ID": 36,
   "label": "decay 2",
   "ParamID": 50,
   "Object": "range"
 },
 {
   "ID": 37,
   "label": "decay 3",
   "ParamID": 51,
   "Object": "range"
 },
 {
   "ID": 38,
   "label": "relase",
   "ParamID": 52,
   "Object": "range"
 },
 {
   "ID": 39,
   "label": "peak",
   "ParamID": 54,
   "Object": "range"
 },
 {
   "ID": 40,
   "label": "break 1",
   "ParamID": 55,
   "Object": "range"
 },
 {
   "ID": 41,
   "label": "break 2",
   "ParamID": 56,
   "Object": "range"
 },
 {
   "ID": 42,
   "label": "sustain",
   "ParamID": 57,
   "Object": "range"
 },
 {
   "ID": 43,
   "label": "vel-lev",
   "ParamID": 58,
   "Object": "range"
 },
 {
   "ID": 44,
   "label": "kbdtrack",
   "ParamID": 61,
   "Object": "range"
 },
 {
   "ID": 45,
   "label": "vel-attack",
   "ParamID": 62,
   "Object": "range"
 },
 {
   "ID": 46,
   "label": "vel-rlease",
   "ParamID": 63,
   "Object": "range"
 },
 {
   "ID": 47,
   "label": "Track Rate Mod",
   "ParamID": 2,
   "Object": "select"
 },
 {
   "ID": 48,
   "label": "rate modsrc",
   "ParamID": 3,
   "Object": "select"
 },
 {
   "ID": 49,
   "label": "depth modsrc",
   "ParamID": 6,
   "Object": "select"
 },
 {
   "ID": 50,
   "label": "waveshape",
   "ParamID": 8,
   "Object": "select"
 },
 {
   "ID": 51,
   "label": "restart-mode",
   "ParamID": 9,
   "Object": "select"
 },
 {
   "ID": 52,
   "label": "track attack mod",
   "ParamID": 14,
   "Object": "select"
 },
 {
   "ID": 53,
   "label": "track release mod",
   "ParamID": 19,
   "Object": "select"
 },
 {
   "ID": 54,
   "label": "mode",
   "ParamID": 25,
   "Object": "select"
 },
 {
   "ID": 55,
   "label": "vel-curve",
   "ParamID": 26,
   "Object": "select"
 },
 {
   "ID": 56,
   "label": "track attack mod",
   "ParamID": 31,
   "Object": "select"
 },
 {
   "ID": 57,
   "label": "track release mod",
   "ParamID": 36,
   "Object": "select"
 },
 {
   "ID": 58,
   "label": "mode",
   "ParamID": 42,
   "Object": "select"
 },
 {
   "ID": 59,
   "label": "vel-curve",
   "ParamID": 43,
   "Object": "select"
 },
 {
   "ID": 60,
   "label": "track attack mod",
   "ParamID": 48,
   "Object": "select"
 },
 {
   "ID": 61,
   "label": "track release mod",
   "ParamID": 53,
   "Object": "select"
 },
 {
   "ID": 62,
   "label": "mode",
   "ParamID": 59,
   "Object": "select"
 },
 {
   "ID": 63,
   "label": "vel-curve",
   "ParamID": 60,
   "Object": "select"
 }
]
}