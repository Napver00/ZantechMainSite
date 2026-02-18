import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Services from './components/Services';
import Projects from './components/Projects';
import About from './components/About';
import Contact from './components/Contact';
import AboutPage from './pages/AboutPage';
import CareerPage from './pages/CareerPage';
import CareerDetailsPage from './pages/CareerDetailsPage';
import CareerApplicationPage from './pages/CareerApplicationPage';
import { useEffect } from 'react';
import AmbassadorsPage from './pages/AmbassadorsPage';
import ImpactPage from './pages/ImpactPage';
import BlogPage from './pages/BlogPage';
import FaqPage from './pages/FaqPage';
import Testimonials from './components/Testimonials';
import Partners from './components/Partners';
import ProjectPage from './pages/ProjectPage';
import ProjectDetailsPage from './pages/ProjectDetailsPage';
import WorkshopPage from './pages/WorkshopPage';
import WorkshopDetailsPage from './pages/WorkshopDetailsPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsAndConditionsPage from './pages/TermsAndConditionsPage';
import WorkshopsSection from './components/WorkshopsSection';
import CustomRobotPage from './pages/CustomRobotPage';
import CoursesPage from './pages/CoursesPage';
import CourseDetailsPage from './pages/CourseDetailsPage';
import ConnectPage from './pages/ConnectPage';

// Scroll to top when changing routes
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}


import Mascot from './components/Mascot';

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
        <Route path="/project/:slug" element={<ProjectDetailsPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/workshops" element={<WorkshopPage />} />
        <Route path="/workshop/:slug" element={<WorkshopDetailsPage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/course/:slug" element={<CourseDetailsPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditionsPage />} />
        <Route path="/custom-robot" element={<CustomRobotPage />} />
        <Route path="/connect" element={<ConnectPage />} />
      </Routes>
      <Footer />
      <Mascot />
    </div>
  );
}

const HomePage = () => (
  <>
    <Hero />
    <About />
    <Services />
    <WorkshopsSection />
    <Testimonials />
    <Partners />
    <Contact />
  </>
);

export default App;