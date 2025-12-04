// app/components/Hero.tsx - Versão minimalista
import Image from "next/image";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 pt-0">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
          
          {/* Foto redonda */}
          <div className="relative -mt-8 -ml-8 lg:-ml-120">
            <div className="relative w-72 h-72 rounded-full overflow-hidden border-4 border-white/30 shadow-2xl">
                <Image
                    src="/Marcus.jpg" // Caminho da sua foto
                    alt="Marcus Cabral - Desenvolvedor"
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 288px, 288px"
                />
            </div>
            {/* Decoração */}
            <div className="absolute -top-2 -right-2 w-20 h-20 bg-teal-400/20 rounded-full blur-xl"></div>
            <div className="absolute -bottom-2 -left-2 w-20 h-20 bg-emerald-400/20 rounded-full blur-xl"></div>
          </div>
          
          {/* Texto */}
          <div className="text-center lg:text-left max-w-2xl">
            <h1 className="text-6xl lg:text-7xl font-bold text-white mb-4">
              Marcus Cabral
            </h1>
            
            <p className="text-2xl lg:text-3xl text-teal-200 mb-8 leading-tight">
              Desenvolvedor Full Stack &<br/>
              <span className="text-white font-semibold">Criador de Soluções Digitais</span>
            </p>
            
            <p className="text-lg text-teal-100 mb-10 leading-relaxed">
              Especializado em transformar desafios complexos em interfaces 
              intuitivas e sistemas robustos que fazem a diferença.
            </p>
            
            <a
              href="#projects"
              className="inline-flex items-center gap-3 px-10 py-4 bg-white text-teal-800 hover:bg-teal-50 font-bold text-lg rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <span>Explorar Projetos</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
          
        </div>
      </div>
    </section>
  );
}