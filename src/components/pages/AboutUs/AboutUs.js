import React from 'react';

const AboutUs = ({aboutUs = ''}) => {
    return (
        <div className='small-container'>
            <h2>ABOUT US</h2>
            <p>{aboutUs}</p>
        </div>
    );
};

export default AboutUs;