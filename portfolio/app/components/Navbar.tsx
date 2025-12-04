"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isAtTop, setIsAtTop] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Verifica se está no topo
      if (currentScrollY < 50) {
        setIsAtTop(true);
        setIsVisible(true); // Sempre visível no topo
      } else {
        setIsAtTop(false);
        
        // Detecta direção do scroll
        if (currentScrollY > lastScrollY.current) {
          // Scroll para baixo - esconde
          setIsVisible(false);
        } else {
          // Scroll para cima - mostra
          setIsVisible(true);
        }
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`w-full fixed z-50 transition-all duration-500 ease-in-out
      ${isVisible ? 'top-4 translate-y-0' : 'top-4 -translate-y-[150%]'}`}>
      
      <div className={`max-w-5xl mx-auto flex justify-between items-center p-4 transition-all duration-300
        ${isAtTop 
          ? 'bg-white/10 backdrop-blur-sm rounded-3xl border border-white/20' // Topo: transparente
          : 'bg-white/90 backdrop-blur-md shadow-lg rounded-2xl' // Scroll: branco sólido
        } ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        
        {/* Logo */}
        <Link href="/" className={`text-2xl font-bold transition-colors duration-200
          ${isAtTop 
            ? 'bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent' // Topo: gradiente branco
            : 'text-gray-800 hover:text-teal-600' // Scroll: cinza escuro
          }`}>
          Marcus
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 text-lg">
          <li>
            <Link 
              href="/" 
              className={`font-medium transition-colors duration-200
                ${isAtTop 
                  ? 'text-white hover:text-teal-300' // Topo: branco
                  : 'text-gray-700 hover:text-teal-600' // Scroll: cinza
                }`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link 
              href="/projects" 
              className={`font-medium transition-colors duration-200
                ${isAtTop 
                  ? 'text-white hover:text-teal-300'
                  : 'text-gray-700 hover:text-teal-600'
                }`}
            >
              Projects
            </Link>
          </li>
          <li>
            <Link 
              href="/about" 
              className={`font-medium transition-colors duration-200
                ${isAtTop 
                  ? 'text-white hover:text-teal-300'
                  : 'text-gray-700 hover:text-teal-600'
                }`}
            >
              About
            </Link>
          </li>
        </ul>

        {/* Mobile Button */}
        <button 
          className={`md:hidden text-2xl w-10 h-10 flex items-center justify-center rounded-full transition-all duration-200
            ${isAtTop 
              ? 'bg-white/20 hover:bg-white/40 text-white' // Topo: branco transparente
              : 'bg-gray-100 hover:bg-gray-200 text-gray-700' // Scroll: cinza claro
            }`}
          onClick={() => setOpen(!open)}
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className={`mt-2 mx-4 md:hidden transition-all duration-300
          ${isAtTop 
            ? 'bg-white/90 backdrop-blur-md' // Topo: branco
            : 'bg-white backdrop-blur-md' // Scroll: branco sólido
          } rounded-2xl shadow-xl p-6 border ${isAtTop ? 'border-teal-100/30' : 'border-gray-200'}`}>
          
          <ul className="flex flex-col gap-4 text-lg">
            <li>
              <Link 
                href="/" 
                className={`block py-3 px-4 rounded-xl hover:bg-teal-50/50 transition-all duration-200 font-medium
                  ${isAtTop ? 'text-teal-700' : 'text-gray-700'}`}
                onClick={() => setOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                href="/projects" 
                className={`block py-3 px-4 rounded-xl hover:bg-teal-50/50 transition-all duration-200 font-medium
                  ${isAtTop ? 'text-teal-700' : 'text-gray-700'}`}
                onClick={() => setOpen(false)}
              >
                Projects
              </Link>
            </li>
            <li>
              <Link 
                href="/about" 
                className={`block py-3 px-4 rounded-xl hover:bg-teal-50/50 transition-all duration-200 font-medium
                  ${isAtTop ? 'text-teal-700' : 'text-gray-700'}`}
                onClick={() => setOpen(false)}
              >
                About
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}