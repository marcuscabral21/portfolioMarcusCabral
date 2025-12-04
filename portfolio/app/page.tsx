// app/page.tsx
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import About from "./components/AboutMe";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-teal-900 via-emerald-800 to-teal-700 text-white">
      {/* Hero + Seta de scroll */}
      <div className="relative min-h-screen">
        <Hero />
        <ScrollIndicator />
      </div>

      {/* Conteúdo sequencial COM IDs */}
      <section id="projects-section">
        <Projects />
      </section>
      
      <section id="about-section">
        <About />
      </section>
      
      <Footer />
    </div>
  );
}

function ScrollIndicator() {
  return (
    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
      <svg 
        className="w-6 h-6 text-white opacity-50" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth="2" 
          d="M19 14l-7 7m0 0l-7-7m7 7V3"
        />
      </svg>
    </div>
  );
}