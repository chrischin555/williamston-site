import React from 'react';
import '../../App.css';
import HeroSection from '../HeroSection';
import Cards from '../Cards';
import PDFConverter from '../PDFConverter';
import EventCalendar from '../EventCalendar';


function Home() {
  return (
    <>
      <HeroSection />
      <Cards />
       {/* Use the PDFConverter component */}
       <PDFConverter /> 
       <EventCalendar />
    </>
  );
}

export default Home;