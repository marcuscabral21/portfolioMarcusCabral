// app/components/About.tsx - Versão Minimalista
import { FaCode, FaServer, FaTools } from "react-icons/fa";

export default function About() {
  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Sobre Mim
          </h2>
          <p className="text-xl text-teal-200">
            Desenvolvedor Full Stack com paixão por criar soluções inovadoras
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
          
          {/* Introdução */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">
              Minha História
            </h3>
            <div className="space-y-4 text-teal-100">
              <p>
                Comecei minha jornada na programação por curiosidade e rapidamente 
                me apaixonei pela capacidade de transformar ideias em realidade 
                através do código.
              </p>
              <p>
                Ao longo dos anos, desenvolvi diversos projetos que me permitiram 
                dominar tanto o frontend quanto o backend, sempre focando em criar 
                experiências de usuário excepcionais.
              </p>
              <p>
                Acredito que a tecnologia deve ser acessível, intuitiva e, acima 
                de tudo, resolver problemas reais das pessoas.
              </p>
            </div>
          </div>
          
          {/* Habilidades */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-white mb-6">
              Minhas Especialidades
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-teal-600/20 rounded-full flex items-center justify-center">
                    <FaCode className="text-xl text-teal-400" />
                  </div>
                  <h4 className="text-lg font-bold text-white">Frontend</h4>
                </div>
                <p className="text-teal-100">
                  Interfaces responsivas, animações suaves e experiências 
                  de usuário memoráveis com React e Next.js.
                </p>
              </div>
              
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-600/20 rounded-full flex items-center justify-center">
                    <FaServer className="text-xl text-blue-400" />
                  </div>
                  <h4 className="text-lg font-bold text-white">Backend</h4>
                </div>
                <p className="text-teal-100">
                  APIs robustas, bancos de dados otimizados e arquiteturas 
                  escaláveis com Node.js e PostgreSQL.
                </p>
              </div>
              
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-purple-600/20 rounded-full flex items-center justify-center">
                    <FaTools className="text-xl text-purple-400" />
                  </div>
                  <h4 className="text-lg font-bold text-white">DevOps</h4>
                </div>
                <p className="text-teal-100">
                  Deploy automatizado, monitoramento e otimização de performance 
                  para garantir a melhor experiência.
                </p>
              </div>
              
            </div>
          </div>
          
          {/* Valores */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">
              Meus Valores
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { title: "Qualidade", desc: "Código limpo e testado" },
                { title: "Inovação", desc: "Soluções criativas" },
                { title: "Colaboração", desc: "Trabalho em equipe" },
                { title: "Compromisso", desc: "Prazos e resultados" }
              ].map((value, index) => (
                <div 
                  key={index}
                  className="bg-white/5 rounded-lg p-4 border border-white/10 text-center"
                >
                  <h4 className="text-white font-bold mb-2">{value.title}</h4>
                  <p className="text-teal-200 text-sm">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>
          
        </div>
        
      </div>
    </section>
  );
}