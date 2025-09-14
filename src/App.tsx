import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Services from './components/Services';
import Projects from './components/Projects';
import About from './components/About';
import Contact from './components/Contact';
import AboutPage from './components/AboutPage';
import CareerPage from './components/CareerPage';
import CareerDetailsPage from './components/CareerDetailsPage';
import CareerApplicationPage from './components/CareerApplicationPage';
import { useEffect } from 'react';
import AmbassadorsPage from './components/AmbassadorsPage';
import ImpactPage from './components/ImpactPage';
import BlogPage from './components/BlogPage';
import FaqPage from './components/FaqPage';
import Testimonials from './components/Testimonials';
import Partners from './components/Partners';
import ProjectPage from './components/ProjectPage';
import ProjectDetailsPage from './components/ProjectDetailsPage';

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
        <Route path="/career" element={<CareerPage />} />
        <Route path="/career/:id" element={<CareerDetailsPage />} />
        <Route path="/career/:id/apply" element={<CareerApplicationPage />} />
        <Route path="/ambassadors" element={<AmbassadorsPage />} />
        <Route path="/impact" element={<ImpactPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/projects" element={<ProjectPage />} />
        <Route path="/project/:id" element={<ProjectDetailsPage />} />
        <Route path="/faq" element={<FaqPage />} />
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
    <Testimonials />
    <Partners />
    <Contact />
  </>
);

export default App;