import { Routes, Route, Navigate, useParams } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import ServicesPage from './pages/ServicesPage';
import PricingPage from './pages/PricingPage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetail from './pages/ProjectDetail';
import Contact from './pages/Contact';
import ComingSoon from './pages/ComingSoon';
import NotFound from './pages/NotFound';

// Old /services/:slug links now land on the matching card of the services page.
function ServiceRedirect() {
  const { slug } = useParams();
  return <Navigate to={`/services#${slug}`} replace />;
}

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/:slug" element={<ServiceRedirect />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/contact" element={<Contact />} />

        {/* Still being written — routes exist so navigation never breaks */}
        <Route path="/solutions" element={<ComingSoon title="Solutions" />} />
        <Route path="/about" element={<ComingSoon title="About" />} />
        <Route path="/faq" element={<ComingSoon title="FAQ" />} />
        <Route path="/privacy-policy" element={<ComingSoon title="Privacy Policy" />} />
        <Route path="/terms" element={<ComingSoon title="Terms & Conditions" />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
