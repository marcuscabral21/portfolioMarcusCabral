// app/page.tsx
import Footer from "./components/Footer"; //Importar o footer

export default function Home() {
  return (
    // GRADIENTE EM TODO O MAIN
    <main className="bg-gradient-to-b from-teal-900 via-emerald-800 to-teal-700 text-white">
      
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 text-center pt-16">
        
        {/* Seu nome/logo */}
        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
            Marcus
          </h1>
          <p className="text-xl md:text-2xl text-teal-200 font-medium mb-8">
            Desenvolvedor & Criador
          </p>
        </div>

        {/* Texto introdutório */}
        <div className="max-w-2xl mb-12">
          <p className="text-lg md:text-xl text-teal-100 mb-6 leading-relaxed">
            Transformando ideias em experiências digitais extraordinárias através 
            de código limpo, design intuitivo e tecnologia de ponta.
          </p>
        </div>

        {/* Botões de ação */}
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="/projects"
            className="px-8 py-3 rounded-full bg-white/20 backdrop-blur-sm text-white font-semibold hover:bg-white/30 hover:shadow-lg transition-all duration-300 border border-white/30"
          >
            Ver Projetos
          </a>
          <a
            href="/contact"
            className="px-8 py-3 rounded-full bg-teal-600/80 backdrop-blur-sm text-white font-semibold hover:bg-teal-700 hover:shadow-lg transition-all duration-300 border border-teal-500/30"
          >
            Entre em Contato
          </a>
        </div>

        {/* Seta para indicar scroll */}
        <div className="absolute bottom-8 animate-bounce">
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
      </section>

      {/* SEÇÃO PROJETOS - COM MESMO FUNDO */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-12">Meus Projetos</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div 
                key={item} 
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 hover:border-white/30 transition-all duration-300"
              >
                <h3 className="text-xl font-semibold text-white mb-3">Projeto {item}</h3>
                <p className="text-teal-100">Descrição do projeto incrível que desenvolvi com tecnologias modernas.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEÇÃO SOBRE - COM MESMO FUNDO */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-8">Sobre Mim</h2>
          <p className="text-lg text-teal-100 mb-8">
            Sou um desenvolvedor apaixonado por criar soluções inovadoras e eficientes. 
            Com experiência em tecnologias modernas, busco sempre entregar o melhor 
            resultado para cada projeto.
          </p>
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold text-white mb-4">Frontend</h3>
              <p className="text-teal-100">React, Next.js, TypeScript, Tailwind CSS</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold text-white mb-4">Backend</h3>
              <p className="text-teal-100">Node.js, Express, PostgreSQL, MongoDB</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      
    </main>
  );
}