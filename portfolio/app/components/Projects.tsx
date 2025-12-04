// app/components/Projects.tsx
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { supabase } from "@/lib/supabase";

// Tipos para os projetos (se quiser manter TypeScript seguro)
type Project = {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  github_link: string;
  photos: string[];
  // Adicionar outros campos que você tem na tabela
};

// Array de cores para as thumbnails (mantém o visual original)
const projectColors = [
  "from-blue-500 to-cyan-500",
  "from-purple-500 to-pink-500",
  "from-teal-500 to-emerald-500",
  "from-orange-500 to-red-500",
  "from-green-500 to-lime-500",
  "from-indigo-500 to-purple-500",
  "from-pink-500 to-rose-500",
  "from-yellow-500 to-orange-500",
  "from-cyan-500 to-blue-500",
  "from-violet-500 to-purple-500"
];

export default async function Projects() {
  try {
    // Busca os projetos do Supabase
    const { data: projects, error } = await supabase
      .from('projects')
      .select('*')

    if (error) {
      console.error("Erro ao buscar projetos:", error);
      return (
        <section id="projects" className="py-20 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-white mb-4">Meus Projetos</h2>
            <p className="text-red-400">Erro ao carregar projetos: {error.message}</p>
          </div>
        </section>
      );
    }

    // Se não houver projetos ou array vazio
    if (!projects || projects.length === 0) {
      return (
        <section id="projects" className="py-20 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-white mb-4">Meus Projetos</h2>
            <p className="text-teal-200">Nenhum projeto encontrado. Adicione alguns projetos no Supabase!</p>
          </div>
        </section>
      );
    }

    return (
      <section id="projects" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          
          {/* Cabeçalho da seção */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Meus Projetos
            </h2>
            <p className="text-xl text-teal-200 max-w-3xl mx-auto">
              Explore alguns dos projetos que desenvolvi, combinando design moderno 
              com funcionalidades robustas e tecnologias atualizadas.
            </p>
          </div>

          {/* Grid de projetos */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project: Project, index: number) => {
              // Usa uma cor baseada no índice (cicla se tiver muitos projetos)
              const colorIndex = index % projectColors.length;
              const imageColor = projectColors[colorIndex];
              
              // Primeira letra do nome para a thumbnail
              const firstLetter = project.name.charAt(0).toUpperCase();
              
              return (
                <div 
                  key={project.id}
                  className="group bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-teal-400/30 hover:bg-white/10 transition-all duration-500 hover:-translate-y-2"
                >
                  
                  {/* Imagem/Thumbnail do projeto */}
                  <div className={`h-48 ${imageColor} relative overflow-hidden`}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-4xl font-bold text-white/80">
                        {firstLetter}
                      </div>
                    </div>
                    
                    {/* Se houver fotos no array, você pode mostrar a primeira */}
                    {project.photos && project.photos.length > 0 && (
                      <div className="absolute inset-0">
                        {/* Aqui você pode implementar um carrossel ou mostrar a primeira foto */}
                        <div className="w-full h-full bg-black/30"></div>
                      </div>
                    )}
                    
                    {/* Overlay hover */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                      {project.github_link && (
                        <a 
                          href={project.github_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-white/20 hover:bg-white/30 p-3 rounded-full text-white transition-colors duration-300"
                          aria-label="Ver código no GitHub"
                        >
                          <FaGithub className="text-xl" />
                        </a>
                      )}
                      {/* Se você tiver um link para demonstração ao vivo, adicione aqui */}
                      {/* 
                      {project.live_url && (
                        <a 
                          href={project.live_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-teal-600 hover:bg-teal-700 p-3 rounded-full text-white transition-colors duration-300"
                          aria-label="Ver demonstração ao vivo"
                        >
                          <FaExternalLinkAlt className="text-xl" />
                        </a>
                      )}
                      */}
                    </div>
                  </div>
                  
                  {/* Conteúdo do projeto */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-teal-300 transition-colors duration-300">
                      {project.name}
                    </h3>
                    
                    <p className="text-teal-100 mb-6 leading-relaxed">
                      {project.description}
                    </p>
                    
                    {/* Tecnologias utilizadas */}
                    <div className="mb-6">
                      <div className="flex flex-wrap gap-2">
                        {project.technologies && project.technologies.map((tech: string, techIndex: number) => (
                          <span 
                            key={techIndex}
                            className="px-3 py-1 bg-white/10 text-teal-200 text-sm rounded-full border border-white/20"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {/* Botões de ação */}
                    <div className="flex gap-3">
                      {project.github_link && (
                        <a 
                          href={project.github_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors duration-300 text-sm font-medium"
                        >
                          <FaGithub />
                          <span>Código</span>
                        </a>
                      )}
                      {/* Se você adicionar um campo para URL de demonstração no Supabase:
                      {project.live_url && (
                        <a 
                          href={project.live_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors duration-300 text-sm font-medium"
                        >
                          <FaExternalLinkAlt />
                          <span>Demo</span>
                        </a>
                      )}
                      */}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Link para mais projetos (opcional) */}
          <div className="text-center mt-16">
            <a 
              href="https://github.com/marcuscabral21" // Altere para seu GitHub
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-full border border-white/20 hover:border-teal-400/50 transition-all duration-300 group"
            >
              <span>Ver mais no GitHub</span>
              <FaGithub className="group-hover:scale-110 transition-transform duration-300" />
            </a>
          </div>

        </div>
      </section>
    );
  } catch (err) {
    console.error("Erro inesperado:", err);
    return (
      <section id="projects" className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Meus Projetos</h2>
          <p className="text-red-400">Erro inesperado ao carregar projetos</p>
        </div>
      </section>
    );
  }
}