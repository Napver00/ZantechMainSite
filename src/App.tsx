import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Services from './components/Services';
import Projects from './components/Projects';
import CampusAmbassadors from './components/CampusAmbassadors';
import About from './components/About';
import Contact from './components/Contact';
import AboutPage from './components/AboutPage';
import { useEffect } from 'react';

// Scroll to top when changing routes
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}


function App() {
  return (
    <div className="min-h-screen transition-colors duration-300">
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

const HomePage = () => (
  <>
    <Hero />
    <About />
    <Services />
    <Projects />
    <CampusAmbassadors />
    <Contact />
  </>
);

export default App;