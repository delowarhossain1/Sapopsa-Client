const numberCount = (number = 0) => {
    let count = '';

    if(number >= 1000){
        const devide = number / 1000;
        const fixedNum = devide.toPrecision(2);
        count = fixedNum + 'K';
    }
    else if(number >= 1000000){
        const devide = number / 1000000;
        const fixedNum = devide.toPrecision(2);
        count = fixedNum + 'M';
    }
    else{
        count = number;
    }

    return count;
}

export default numberCount;