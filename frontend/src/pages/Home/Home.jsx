import React from 'react'
import Navbar from '../../shared/components/Navbar'
import Footer from '../../shared/components/Footer'
import HeroSection from './components/HeroSection'
import StreamlinedSection from './components/StreamlinedSection'
import { ConvenienceSection } from './components/ConvenienceSection'
import BenefitsSection from './components/BenefitsSection'
import TestimonialSection from './components/TestimonialSection'

const Home = () => {
  return (
    <>
      <Navbar/>
      <HeroSection/>
      <StreamlinedSection/>
      <ConvenienceSection/>
      <BenefitsSection/>
      <TestimonialSection/>
      <Footer/>
    </>

  )
}

export default Home