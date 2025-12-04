"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [navState, setNavState] = useState<'top' | 'scrolled-down' | 'scrolled-up'>('top');
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Estado 1: No topo da página
      if (currentScrollY < 50) {
        setNavState('top');
      } 
      // Estado 2: Rolando para baixo
      else if (currentScrollY > lastScrollY.current) {
        setNavState('scrolled-down');
      } 
      // Estado 3: Rolando para cima (mas não no topo)
      else {
        setNavState('scrolled-up');
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`w-full fixed top-0 left-0 z-50 transition-all duration-500
      ${navState === 'scrolled-down' ? 'translate-y-[-100%]' : 'translate-y-0'}`}>
      
      {/* Container principal da navbar */}
      <div className={`w-full transition-all duration-500
        ${navState === 'top' 
          ? 'bg-transparent text-white py-6' // ESTADO INICIAL
          : navState === 'scrolled-down'
          ? 'bg-white/95 backdrop-blur-md shadow-lg text-gray-800 py-4' // SCROLL P/ BAIXO
          : 'bg-gray-900/95 backdrop-blur-md text-white py-4' // SCROLL P/ CIMA
        }`}>
        
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          
          {/* Logo - muda de cor conforme estado */}
          <Link href="/" className={`text-2xl font-bold transition-all duration-500
            ${navState === 'scrolled-down' 
              ? 'text-gray-800 hover:text-teal-600' 
              : 'text-white hover:text-teal-300'
            }`}>
            Marcus
          </Link>

          {/* Desktop Menu - muda de cor conforme estado */}
          <ul className="hidden md:flex gap-10 text-lg">
            <li>
              <Link 
                href="/" 
                className={`font-medium transition-all duration-500
                  ${navState === 'scrolled-down' 
                    ? 'text-gray-700 hover:text-teal-600' 
                    : 'text-white hover:text-teal-300'
                  }`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                href="/about" 
                className={`font-medium transition-all duration-500
                  ${navState === 'scrolled-down' 
                    ? 'text-gray-700 hover:text-teal-600' 
                    : 'text-white hover:text-teal-300'
                  }`}
              >
                About
              </Link>
            </li>
            <li>
              <Link 
                href="/projects" 
                className={`font-medium transition-all duration-500
                  ${navState === 'scrolled-down' 
                    ? 'text-gray-700 hover:text-teal-600' 
                    : 'text-white hover:text-teal-300'
                  }`}
              >
                Projects
              </Link>
            </li>
            <li>
              <Link 
                href="/contact" 
                className={`font-medium transition-all duration-500
                  ${navState === 'scrolled-down' 
                    ? 'text-gray-700 hover:text-teal-600' 
                    : 'text-white hover:text-teal-300'
                  }`}
              >
                Contact
              </Link>
            </li>
          </ul>

          {/* Mobile Button - muda conforme estado */}
          <button 
            className={`md:hidden text-2xl w-10 h-10 flex items-center justify-center rounded-full transition-all duration-500
              ${navState === 'scrolled-down' 
                ? 'bg-gray-100 hover:bg-gray-200 text-gray-700' 
                : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            onClick={() => setOpen(!open)}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu - muda conforme estado */}
      {open && (
        <div className={`md:hidden transition-all duration-500
          ${navState === 'scrolled-down' 
            ? 'bg-white/95 backdrop-blur-md' 
            : 'bg-gray-900/95 backdrop-blur-md'
          }`}>
          <div className="p-6">
            <ul className="flex flex-col gap-6 text-lg">
              <li>
                <Link 
                  href="/" 
                  className={`block py-3 px-4 rounded-lg transition-all duration-200 font-medium
                    ${navState === 'scrolled-down' 
                      ? 'text-gray-700 hover:bg-gray-100' 
                      : 'text-white hover:bg-gray-800'
                    }`}
                  onClick={() => setOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  href="/about" 
                  className={`block py-3 px-4 rounded-lg transition-all duration-200 font-medium
                    ${navState === 'scrolled-down' 
                      ? 'text-gray-700 hover:bg-gray-100' 
                      : 'text-white hover:bg-gray-800'
                    }`}
                  onClick={() => setOpen(false)}
                >
                  About
                </Link>
              </li>
              <li>
                <Link 
                  href="/projects" 
                  className={`block py-3 px-4 rounded-lg transition-all duration-200 font-medium
                    ${navState === 'scrolled-down' 
                      ? 'text-gray-700 hover:bg-gray-100' 
                      : 'text-white hover:bg-gray-800'
                    }`}
                  onClick={() => setOpen(false)}
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className={`block py-3 px-4 rounded-lg transition-all duration-200 font-medium
                    ${navState === 'scrolled-down' 
                      ? 'text-gray-700 hover:bg-gray-100' 
                      : 'text-white hover:bg-gray-800'
                    }`}
                  onClick={() => setOpen(false)}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
}