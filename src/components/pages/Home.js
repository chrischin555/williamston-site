import React from 'react';
import '../../App.css';
import HeroSection from '../HeroSection';
import Cards from '../Cards';
import PDFConverter from '../PDFConverter';

function Home() {
  return (
    <>
      <HeroSection />
      <Cards />
       {/* Use the PDFConverter component */}
       <PDFConverter /> 
    </>
  );
}

export default Home;