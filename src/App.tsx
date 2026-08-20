import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Services from './components/Services';
import Projects from './components/Projects';
import About from './components/About';
import Contact from './components/Contact';
import Testimonials from './components/Testimonials';
import Partners from './components/Partners';
import WorkshopsSection from './components/WorkshopsSection';
import CoursesSection from './components/CoursesSection';
import { Suspense, lazy, useEffect } from 'react';

// Lazy load page components
const AboutPage = lazy(() => import('./pages/AboutPage'));
const TeamPage = lazy(() => import('./pages/TeamPage'));
const CareerPage = lazy(() => import('./pages/CareerPage'));
const CareerDetailsPage = lazy(() => import('./pages/CareerDetailsPage'));
const CareerApplicationPage = lazy(() => import('./pages/CareerApplicationPage'));
const AmbassadorsPage = lazy(() => import('./pages/AmbassadorsPage'));
const ImpactPage = lazy(() => import('./pages/ImpactPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const FaqPage = lazy(() => import('./pages/FaqPage'));
const ProjectPage = lazy(() => import('./pages/ProjectPage'));
const ProjectDetailsPage = lazy(() => import('./pages/ProjectDetailsPage'));
const WorkshopPage = lazy(() => import('./pages/WorkshopPage'));
const WorkshopDetailsPage = lazy(() => import('./pages/WorkshopDetailsPage'));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'));
const TermsAndConditionsPage = lazy(() => import('./pages/TermsAndConditionsPage'));
const CustomRobotPage = lazy(() => import('./pages/CustomRobotPage'));
const CoursesPage = lazy(() => import('./pages/CoursesPage'));
const CourseDetailsPage = lazy(() => import('./pages/CourseDetailsPage'));
const ConnectPage = lazy(() => import('./pages/ConnectPage'));
const TutorialsPage = lazy(() => import('./pages/TutorialsPage'));
const PortfolioPage = lazy(() => import('./pages/PortfolioPage'));
const AchievementsPage = lazy(() => import('./pages/AchievementsPage'));

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
  const { pathname } = useLocation();
  const isStandalonePortfolio = pathname === '/portfolio';

  return (
    <div className="min-h-screen transition-colors duration-300">
      <ScrollToTop />
      {!isStandalonePortfolio && <Navbar />}
      <Suspense fallback={
        <div className="min-h-screen bg-zan-dark flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-zan-cyan"></div>
        </div>
      }>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/team" element={<TeamPage />} />
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
          <Route path="/tutorials" element={<TutorialsPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditionsPage />} />
          <Route path="/custom-robot" element={<CustomRobotPage />} />
          <Route path="/connect" element={<ConnectPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/achievements" element={<AchievementsPage />} />
        </Routes>
      </Suspense>
      {!isStandalonePortfolio && <Footer />}
      {!isStandalonePortfolio && <Mascot />}
    </div>
  );
}

const HomePage = () => (
  <>
    <Hero />
    <About />
    <Services />
    <CoursesSection />
    <WorkshopsSection />
    <Testimonials />
    <Partners />
    <Contact />
  </>
);

export default App;