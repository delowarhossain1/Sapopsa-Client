import React from 'react';
import { BsCurrencyEuro } from 'react-icons/bs';

const EuroSign = ({price = 0}) => {
    return (
        <div style={{display : 'flex', alignItems : 'center'}}>
            <BsCurrencyEuro/>
            <span>{price}</span>
        </div>
    );
};

export default EuroSign;