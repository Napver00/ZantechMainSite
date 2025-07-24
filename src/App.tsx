import React from 'react';
import { MessageCircle } from 'lucide-react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Services from './components/Services';
import Projects from './components/Projects';
import CampusAmbassadors from './components/CampusAmbassadors';
import About from './components/About';
import Contact from './components/Contact';

function App() {
  return (
    <div className="min-h-screen transition-colors duration-300">
      <Navbar />
      <Hero />
      <Services />
      <Projects />
      <CampusAmbassadors />
      <About />
      <Contact />
      <Footer />

      {/* Floating Chatbot */}
      {/* <button className="fixed bottom-6 right-6 bg-gradient-to-r from-cyan-500 to-blue-600 text-white p-4 rounded-full shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-110 z-50">
        <MessageCircle className="w-6 h-6" />
      </button> */}
    </div>
  );
}

export default App;