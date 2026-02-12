import React from 'react';
import Hero from '../components/Hero';
import MarketProblem from '../components/MarketProblem';
import Solutions from '../components/Solutions';
import AboutUs from '../components/AboutUs';
import Plans from '../components/Plans';
import FAQ from '../components/FAQ';
import Contact from '../components/Contact';

const LandingPage: React.FC = () => {
    return (
        <>
            <Hero />
            <Solutions />
            <AboutUs />
            <MarketProblem />
            <Plans />
            <FAQ />
            <Contact />
        </>
    );
};

export default LandingPage;
