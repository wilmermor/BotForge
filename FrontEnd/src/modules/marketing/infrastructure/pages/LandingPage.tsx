import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero';
import MarketProblem from '../components/MarketProblem';
import Solutions from '../components/Solutions';
import AboutUs from '../components/AboutUs';
import Plans from '../components/Plans';
import FAQ from '../components/FAQ';
import Contact from '../components/Contact';

const LandingPage: React.FC = () => {
    const { hash } = useLocation();

    useEffect(() => {
        if (hash) {
            const element = document.getElementById(hash.replace('#', ''));
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        }
    }, [hash]);
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