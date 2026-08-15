import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import Layout from './components/Layout';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Contact = lazy(() => import('./pages/Contact'));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center pt-20">
    <div className="w-12 h-12 border-4 border-brand-green/20 border-t-brand-green rounded-full animate-spin"></div>
  </div>
);

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={
              <Suspense fallback={<PageLoader />}>
                <Home />
              </Suspense>
            } />
            <Route path="about" element={
              <Suspense fallback={<PageLoader />}>
                <About />
              </Suspense>
            } />
            <Route path="services" element={
              <Suspense fallback={<PageLoader />}>
                <Services />
              </Suspense>
            } />
            <Route path="services/:id" element={
              <Suspense fallback={<PageLoader />}>
                <ServiceDetail />
              </Suspense>
            } />
            <Route path="gallery" element={
              <Suspense fallback={<PageLoader />}>
                <Gallery />
              </Suspense>
            } />
            <Route path="contact" element={
              <Suspense fallback={<PageLoader />}>
                <Contact />
              </Suspense>
            } />
          </Route>
        </Routes>
      </Router>
    </HelmetProvider>
  );
}
