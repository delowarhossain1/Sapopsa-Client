import React, { useState } from 'react';
import Arrivals from './Arrivals/Arrivals';
import Categories from './Categories/Categories';
import Slider from './Slider/Slider';
import Loading from './../../shared/Loading/Loading';


const Home = () => {
    const [loading, setLoading] = useState(false);

    // Set loading status;
    if(loading) <Loading />;

    return (
        <>
           <Slider setLoading={setLoading}/>
           <Categories setLoading={setLoading}/> 
           <Arrivals setLoading={setLoading}/>
        </>
    );
};

export default Home;