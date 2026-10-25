import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import About from './components/About';
import Contact from './components/Contact';
import Testimonials from './components/Testimonials';
import Partners from './components/Partners';
import WorkshopsSection from './components/WorkshopsSection';
import CoursesSection from './components/CoursesSection';
import BootcampsSection from './components/BootcampsSection';
import AchievementsSection from './components/AchievementsSection';
import { Suspense, lazy, useEffect } from 'react';

// Lazy load page components
const AboutPage = lazy(() => import('./pages/AboutPage'));
const TeamPage = lazy(() => import('./pages/TeamPage'));
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
const BootcampsPage = lazy(() => import('./pages/BootcampsPage'));
const BootcampDetailsPage = lazy(() => import('./pages/BootcampDetailsPage'));
const CoursesPage = lazy(() => import('./pages/CoursesPage'));
const CourseDetailsPage = lazy(() => import('./pages/CourseDetailsPage'));
const CourseRegistrationPage = lazy(() => import('./pages/CourseRegistrationPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const TutorialsPage = lazy(() => import('./pages/TutorialsPage'));
const TutorialDetailsPage = lazy(() => import('./pages/TutorialDetailsPage'));
const PortfolioPage = lazy(() => import('./pages/PortfolioPage'));
const AchievementsPage = lazy(() => import('./pages/AchievementsPage'));

// Addresses are typed and shared in all sorts of casing (/Contact, /PORTFOLIO);
// send them to the canonical lowercase path so links always look the same.
const LowercasePaths = () => {
  const { pathname, search, hash } = useLocation();
  const lower = pathname.toLowerCase();
  // Slugs are lowercase too, so the whole path can be normalised.
  if (pathname !== lower) return <Navigate to={`${lower}${search}${hash}`} replace />;
  return null;
};

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
      <LowercasePaths />
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
          {/* Careers were removed; old links land on the team page */}
          <Route path="/career/*" element={<Navigate to="/team" replace />} />
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
          <Route path="/course/:slug/register" element={<CourseRegistrationPage />} />
          <Route path="/tutorials" element={<TutorialsPage />} />
          <Route path="/tutorial/:slug" element={<TutorialDetailsPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditionsPage />} />
          <Route path="/bootcamps" element={<BootcampsPage />} />
          <Route path="/bootcamp/:slug" element={<BootcampDetailsPage />} />
          <Route path="/bootcamp/:slug/register" element={<CourseRegistrationPage />} />
          <Route path="/custom-robot" element={<Navigate to="/bootcamps" replace />} />
          <Route path="/contact" element={<ContactPage />} />
          {/* Old address, kept so shared links still work */}
          <Route path="/connect" element={<Navigate to="/contact" replace />} />
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
    <CoursesSection />
    <BootcampsSection />
    <AchievementsSection />
    <WorkshopsSection />
    <Testimonials />
    <Partners />
    <Contact />
  </>
);

export default App;