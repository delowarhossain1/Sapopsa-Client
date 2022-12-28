import React from 'react';
import Navbar from '../../shared/Navbar/Navbar';
import Arrivals from './Arrivals/Arrivals';
import Categories from './Categories/Categories';
import Slider from './Slider/Slider';

const Home = () => {
    return (
        <>
           <Navbar />
           <Slider />
           <Categories /> 
           <Arrivals />
        </>
    );
};

export default Home;