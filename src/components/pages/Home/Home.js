import React from 'react';
import Arrivals from './Arrivals/Arrivals';
import Categories from './Categories/Categories';
import Slider from './Slider/Slider';

const Home = () => {
    return (
        <>
           <Slider />
           <Categories /> 
           <Arrivals />
        </>
    );
};

export default Home;