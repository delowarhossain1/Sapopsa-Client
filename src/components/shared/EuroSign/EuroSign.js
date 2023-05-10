import React from 'react';
import { BsCurrencyEuro } from 'react-icons/bs';

const EuroSign = ({price = 0}) => {
    return (
        <span style={{display : 'flex', alignItems : 'center'}}>
            <BsCurrencyEuro/>
            <span>{price}</span>
        </span>
    );
};

export default EuroSign;