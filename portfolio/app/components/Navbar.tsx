"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from 'next/navigation';
import Image from "next/image";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isAtTop, setIsAtTop] = useState(true);
  const lastScrollY = useRef(0);
  const pathname = usePathname();

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < 50) {
        setIsAtTop(true);
        setIsVisible(true);
      } else {
        setIsAtTop(false);
        
        if (currentScrollY > lastScrollY.current) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      setOpen(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    setOpen(false);
  };

  return (
    <nav className={`w-full fixed z-50 transition-all duration-500 ease-in-out
      ${isVisible ? 'top-4 translate-y-0' : 'top-4 -translate-y-[150%]'}`}>
      
      {/* NAVBAR COM O MESMO TAMANHO ORIGINAL */}
      <div className={`max-w-5xl mx-auto flex items-center p-4 transition-all duration-300
        ${isAtTop 
          ? 'bg-white/10 backdrop-blur-sm rounded-3xl border border-white/20'
          : 'bg-gray-800/95 backdrop-blur-md shadow-lg rounded-2xl border border-gray-700/30'
        } ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        
        {/* LOGO COM A MESMA ALTURA DOS ITENS DO MENU */}
        <button 
          onClick={scrollToTop}
          className="focus:outline-none flex items-center h-full"
          aria-label="Voltar ao topo"
        >
          <div className="relative h-[70px] w-auto hover:opacity-90 transition-opacity duration-200">
            {/* Logo verde para fundo claro, logo normal para fundo escuro */}
            {isAtTop ? (
              // Quando está no topo (fundo escuro) - logo normal
              <Image
                src="/logo.png"
                alt="Logo"
                width={0}
                height={0}
                sizes="(max-width: 768px) 120px, 160px"
                className="h-full w-auto object-contain"
                priority
              />
            ) : (
              // Quando rola (fundo claro) - logo verde
              <Image
                src="/logo-green.png"  // Logo verde para light theme
                alt="Logo"
                width={0}
                height={0}
                sizes="(max-width: 768px) 120px, 160px"
                className="h-full w-auto object-contain"
                priority
              />
            )}
          </div>
        </button>

        {/* Espaço entre logo e menu */}
        <div className="flex-1" />

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 text-lg items-center">
          <li>
            <button 
              onClick={scrollToTop}
              className={`font-medium transition-colors duration-200 focus:outline-none py-2
                ${isAtTop 
                  ? 'text-white hover:text-teal-300'
                  : 'text-white hover:text-teal-300'
                }`}
              aria-label="Ir para Home"
            >
              Home
            </button>
          </li>
          <li>
            <button 
              onClick={() => scrollToSection('projects-section')}
              className={`font-medium transition-colors duration-200 focus:outline-none py-2
                ${isAtTop 
                  ? 'text-white hover:text-teal-300'
                  : 'text-white hover:text-teal-300'
                }`}
              aria-label="Ir para Projetos"
            >
              Projects
            </button>
          </li>
          <li>
            <button 
              onClick={() => scrollToSection('about-section')}
              className={`font-medium transition-colors duration-200 focus:outline-none py-2
                ${isAtTop 
                  ? 'text-white hover:text-teal-300'
                  : 'text-white hover:text-teal-300'
                }`}
              aria-label="Ir para Sobre"
            >
              About
            </button>
          </li>
        </ul>

        {/* Mobile Button */}
        <button 
          className={`md:hidden text-2xl w-10 h-10 flex items-center justify-center rounded-full transition-all duration-200 focus:outline-none ml-4
            ${isAtTop 
              ? 'bg-white/20 hover:bg-white/40 text-white'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          onClick={() => setOpen(!open)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className={`mt-2 mx-4 md:hidden transition-all duration-300
          ${isAtTop 
            ? 'bg-white/90 backdrop-blur-md'
            : 'bg-white backdrop-blur-md'
          } rounded-2xl shadow-xl p-6 border ${isAtTop ? 'border-teal-100/30' : 'border-gray-200'}`}>
          
          <ul className="flex flex-col gap-4 text-lg">
            <li>
              <button 
                onClick={scrollToTop}
                className={`block w-full text-left py-3 px-4 rounded-xl hover:bg-teal-50/50 transition-all duration-200 font-medium focus:outline-none
                  ${isAtTop ? 'text-teal-700' : 'text-gray-700'}`}
                aria-label="Ir para Home"
              >
                Home
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection('projects-section')}
                className={`block w-full text-left py-3 px-4 rounded-xl hover:bg-teal-50/50 transition-all duration-200 font-medium focus:outline-none
                  ${isAtTop ? 'text-teal-700' : 'text-gray-700'}`}
                aria-label="Ir para Projetos"
              >
                Projects
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection('about-section')}
                className={`block w-full text-left py-3 px-4 rounded-xl hover:bg-teal-50/50 transition-all duration-200 font-medium focus:outline-none
                  ${isAtTop ? 'text-teal-700' : 'text-gray-700'}`}
                aria-label="Ir para Sobre"
              >
                About
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}