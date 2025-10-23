export const Schema = {
    EXCLUSIVE: 0xF0,
    MANUFACTURERID: 0x42,
    MESSAGE_FORMAT: 0x30,
    CHANNEL: 0x01,
    DEVICEID: 0x19,
    EOX: 0xF7,
    messages: {
        send_parameter:{ type: 'sysex',  template: 'PARAMETER_CHANGE', address: 'parameters' }
    },
    message_templates: {
        HEADER: "EXCLUSIVE\nMANUFACTURERID\nMESSAGE_FORMAT CHANNEL\nDEVICEID",
        FOOTER: "EOX",
        PROGRAM_PARAMETER_REQUEST: "[HEADER]\n0x10\nEOX",
        ALL_PROGRAM_PARAMETER_REQUEST: "[HEADER]\n0x1C\nEOX",
        PARAMETER_CHANGE: "[HEADER]\n0x41\n{address}\n*Value*\nEOX"
    },
    parameters: {
        basic_oscMode: {
            label: "Mode",
            page: 0,
            position: 8,
            valtype: "table",
            range: [0,2],
        },
        basic_polyphony: {
            page: 0,
            position: 10,
            valtype: "table",
            range: [0,1],
        },
        basic_hold: {
            page: 0,
            position: 12,
            valtype: "bool",
        },
        osc1_multisound: {
            page: 1,
            position: 8,
            valtype: "table",
            range: [0 - 63]
        },
        osc1_level: {
            page: 1,
            position: 11,
            valtype: "default",
            range: [0, 99]
        },
        osc1_octave: {
            page: 1,
            position: 12,
            valtype: "table",
            range: [0, 2]
        },

        osc2_multisound: {
            page: 2,
            position: 8,
            valtype: "table",
            range: [0 - 63]
        },
        osc2_level: {
            page: 2,
            position: 11,
            valtype: "default",
            range: [0, 99]
        },
        osc2_octave: {
            page: 2,
            position: 12,
            valtype: "table",
            range: [0, 2]
        },
        osc2_interval: {
            page: 2,
            position: 13,
            valtype: "twoscompliment",
            range: [-12, 12]
        },
        osc2_detune: {
            page: 2,
            position: 14,
            valtype: "twoscompliment",
            range: [-50, 50]
        },
        osc2_delayStart: {
            page: 2,
            position: 15,
            valtype: "default",
            range: [0, 63]
        },
        osc2_startLevel: {
            page: 4,
            position: 8,
            valtype: "twoscompliment",
            range: [-99, 99]
        },
        peg1_attack_time: {
            page: 3,
            position: 9,
            valtype: "default",
            range: [0, 63]
        },
        peg1_attack_level: {
            page: 3,
            position: 10,
            valtype: "twoscompliment",
            range: [-99, 99]
        },
        peg1_decay_time: {
            page: 3,
            position: 11,
            valtype: "default",
            range: [0, 63]
        },
        peg1_release_time: {
            page: 3,
            position: 12,
            valtype: "default",
            range: [0, 63]
        },
        peg1_release_level: {
            page: 3,
            position: 13,
            valtype: "twoscompliment",
            range: [-99, 99]
        },
        peg1_level_vel_sens: {
            page: 3,
            position: 14,
            valtype: "twoscompliment",
            range: [-99, 99]
        },
        peg1_time_vel_sens: {
            page: 3,
            position: 15,
            valtype: "twoscompliment",
            range: [-99, 99]
        },
        
        peg2_attack_time: {
            page: 4,
            position: 9,
            valtype: "default",
            range: [0, 63]
        },
        peg2_attack_level: {
            page: 4,
            position: 10,
            valtype: "twoscompliment",
            range: [-99, 99]
        },
        peg2_decay_time: {
            page: 4,
            position: 11,
            valtype: "default",
            range: [0, 63]
        },
        peg2_release_time: {
            page: 4,
            position: 12,
            valtype: "default",
            range: [0, 63]
        },
        peg2_release_level: {
            page: 4,
            position: 13,
            valtype: "twoscompliment",
            range: [-99, 99]
        },
        peg2_level_vel_sens: {
            page: 4,
            position: 14,
            valtype: "twoscompliment",
            range: [-99, 99]
        },
        peg2_time_vel_sens: {
            page: 4,
            position: 15,
            valtype: "twoscompliment",
            range: [-99, 99]
        },
    },

    tables: {
        multiwaves: {
            0: "00: Piano",
            1: "01: E. Piano 1",
            2: "02: E. Piano 2",
            3: "03: Clav",
            4: "04: Harpsicord",
            5: "05: Organ 1",
            6: "06: Organ 2",
            7: "07: MagicOrgan",
            8: "08: Guitar 1",
            9: "09: Guitar 2",
            10: "10: E. Guitar",
            11: "11: Sitar 1",
            12: "12: Sitar 2",
            13: "13: A. Bass",
            14: "14: Pick Bass",
            15: "15: E. Bass",
            16: "16: Fretless",
            17: "17: SynthBass 1",
            18: "18: SynthBass 2",
            19: "19: Vibes 4 Flexatone",
            20: "20: Bell",
            21: "21: Tubular",
            22: "22: Bell Ring",
            23: "23: Karimba",
            24: "24: KarimbaNT",
            25: "25: SynMallet",
            26: "26: Flute",
            27: "27: Pan Flute",
            28: "28: Bottles",
            29: "29: Voices",
            30: "30: Choir",
            31: "31: Strings",
            32: "32: Brass 1",
            33: "33: Brass 2",
            34: "34: Tenor Sax",
            35: "35: Mute TP",
            36: "36: Trumpet",
            37: "37: TubaFlugel",
            38: "38: DoubleReed",
            39: "39: Koto Trem",
            40: "40: BambooTrem",
            41: "41: Rhythm",
            42: "42: Lore",
            43: "43: Lore NT",
            44: "44: Flexatone",
            45: "45: WindBels",
            46: "46: Pole",
            47: "47: Pole NT",
            48: "48: Block",
            49: "49: Block NT",
            50: "50: FingerSnap",
            51: "51: Pop",
            52: "52: Drop",
            53: "53: Drop NT",
            55: "55: Breath NT",
            56: "56: Pluck",
            57: "57: Pluck NT",
            58: "58: Vibe Hit",
            59: "59: VibeHit NT",
            60: "60: Hammer",
            61: "61: Metal Hit",
            62: "62: MetalHitNT",
            63: "63: Pick",
            64: "64: Distortion",
            65: "65: Dist NT",
            67: "67: Bass Thump",
            68: "68: BasThumNT2",
            69: "69: Wire",
            70: "70: Pan Wave",
            71: "71: Ping Wave",
            72: "72: Fv Wave",
            73: "73: Mv Wave",
            74: "74: Voice Wave",
            75: "75: VoiceWvNT 1",
            76: "76: VoiceWvNT 2",
            77: "77: DWGS E. P. 1",
            78: "78: DWGS E. P. 2",
            79: "79: DWGS E. P. 3",
            80: "80: DWGS Piano",
            81: "81: DWGS Clav",
            82: "82: DWGS Vibe 1",
            83: "83: DWGS Bass 1",
            84: "84: DWGS Bass 2",
            85: "85: DWGS Bell 1",
            86: "86: DWGS Orgn 1",
            87: "87: DWGS Orgn 2",
            88: "88: DWGS Voice",
            89: "89: Square Wave",
            90: "90: Digital 1",
            91: "91: Saw Wave",
            92: "92: Digital 2",
            93: "93: 25% Pulse",
            94: "94: 10% Pulse",
            95: "95: Digital 3",
            96: "96: Digital 4",
            97: "97: Digital 5",
            98: "98: DWGS TRI",
            99: "99: DWGS Sin",
        }
    }

}