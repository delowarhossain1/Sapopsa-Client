import React from 'react';
import { HiOutlinePaperAirplane } from 'react-icons/hi';

const UpdateBtn = () => {
    const style = {
        fontSize: '17px',
        padding: '5px 10px',
        outline: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center'
    }

    return (
        <button style={style}>
            Update Info <HiOutlinePaperAirplane style={{marginLeft : '5px'}}/>
        </button>
    );
};

export default UpdateBtn;