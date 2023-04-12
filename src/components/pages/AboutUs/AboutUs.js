import React from 'react';

const AboutUs = ({aboutUs = ''}) => {
    return (
        <div className='small-container'>
            <h2>About us</h2>

            <p>{aboutUs}</p>
        </div>
    );
};

export default AboutUs;