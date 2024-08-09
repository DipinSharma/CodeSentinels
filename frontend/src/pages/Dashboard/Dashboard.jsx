import React from 'react'
import Navbar from '../../shared/components/Navbar'
import Footer from '../../shared/components/Footer'
import HeroSection from './components/HeroSection'
import Stats from './components/Stats'
import CTA from './components/CTA'
import FAQ from './components/FAQ'

const Dashboard = () => {
    return (
        <>
            <Navbar />
            <HeroSection />
            <Stats />
            <FAQ/>
            <CTA />
            <Footer />
        </>

    )
}

export default Dashboard