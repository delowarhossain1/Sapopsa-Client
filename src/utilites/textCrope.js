function textCrope(text = '', len = 0){
    const crope = text?.length > len ? text.slice(0, len) + '...' : text;
    return crope;
}

export default textCrope;