// app/components/Footer.tsx
import { FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="py-12 px-4 border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        {/* Container flex para alinhar texto e ícone */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Texto à esquerda */}
          <div className="text-center md:text-left">
            <p className="text-teal-200">
              © {new Date().getFullYear()} Marcus. Todos os direitos reservados.
            </p>
          </div>
          
          {/* LinkedIn à direita */}
          <div className="flex items-center">
            <a 
              href="https://www.linkedin.com/in/marcus-cabral-529a61233/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-teal-300 transition-colors duration-300 text-3xl transform hover:scale-110"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
          </div>
          
        </div>
      </div>
    </footer>
  );
}