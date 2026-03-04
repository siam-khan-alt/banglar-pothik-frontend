import React from 'react';
import Hero from '../components/home/Hero';
import Seasons from '../components/home/Seasons';
import Divisions from '../components/home/Divisions';

const Home = () => {
    return (
        <div>
            <Hero/>
            <Seasons/>
            <Divisions/>
           
        </div>
    );
};

export default Home;