// convet int to nibbles
// twosCompliment
export const ValueTools = {
    split_to_nibbles  : (hex, endian='low') => {
    const MSB = (hex >> 7) & 0x0F
    const LSB = (hex & 0x7F)
    if(endian == 'low') {
        return [LSB,MSB]
    } else {
        return [MSB,LSB]
    }
}
}