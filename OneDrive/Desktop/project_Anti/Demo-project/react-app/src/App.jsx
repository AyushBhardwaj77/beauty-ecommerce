// src/App.jsx
import { useEffect } from 'react';
import { useTheme } from './hooks/useTheme';
import { useScrollAnimation } from './hooks/useScrollAnimation';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import About from './components/About';
import Testimonials from './components/Testimonials';
import CTA from './components/CTA';
import Footer from './components/Footer';

export default function App() {
  const { theme } = useTheme();
  useScrollAnimation(); // Attaches IntersectionObserver to the whole document

  return (
    <div data-theme={theme} style={{ backgroundColor: 'var(--bg)', color: 'var(--text-primary)', minHeight: '100vh' }}>
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Portfolio />
        <About />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
