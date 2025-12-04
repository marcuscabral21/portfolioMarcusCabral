'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { supabase } from '@/lib/supabase';
import { 
  FaEdit, 
  FaTrash, 
  FaPlus, 
  FaGithub, 
  FaExternalLinkAlt,
  FaSignOutAlt
} from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';

type Project = {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  photos: string[];
  github_link: string;
  live_url?: string;
  created_at?: string;
};

export default function AdminPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<Project>();

  // Verificar se usuário está autenticado
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
    } catch (error) {
      console.error('Erro ao verificar autenticação:', error);
    } finally {
      setAuthLoading(false);
    }
  };

  // Carregar projetos
  const loadProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        //.order('created_at', { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (error: any) {
      toast.error('Erro ao carregar projetos: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadProjects();
    }
  }, [isAuthenticated]);

  // Login simples com email/senha
   const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    console.log('Tentando login com:', { email, password: '***' });

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      console.log('Resposta do Supabase:', { data, error });

      if (error) {
        console.error('Erro detalhado:', error);
        toast.error(`Erro: ${error.message} (${error.status})`);
        return;
      }
      
      setIsAuthenticated(true);
      toast.success('Login realizado com sucesso!');
    } catch (error: any) {
      console.error('Erro inesperado:', error);
      toast.error(`Erro inesperado: ${error.message}`);
    }
  };

  // Logout
  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      setIsAuthenticated(false);
      setProjects([]);
      toast.success('Logout realizado com sucesso!');
    } catch (error: any) {
      toast.error('Erro ao fazer logout: ' + error.message);
    }
  };

  // Abrir modal para criar ou editar
  const openCreateModal = () => {
    reset({
      name: '',
      description: '',
      technologies: [],
      photos: [],
      github_link: '',
      live_url: ''
    });
    setEditingProject(null);
    setIsModalOpen(true);
  };

  const openEditModal = (project: Project) => {
    setEditingProject(project);
    setValue('name', project.name);
    setValue('description', project.description);
    setValue('technologies', project.technologies);
    setValue('photos', project.photos);
    setValue('github_link', project.github_link);
    setValue('live_url', project.live_url || '');
    setIsModalOpen(true);
  };

  // Salvar projeto (create ou update)
  const onSubmit = async (data: Project) => {
    try {
      // Converter string de tecnologias para array
      const techArray = data.technologies
        ? typeof data.technologies === 'string'
          ? data.technologies.split(',').map(t => t.trim()).filter(t => t)
          : data.technologies
        : [];

      // Converter string de fotos para array
      const photosArray = data.photos
        ? typeof data.photos === 'string'
          ? data.photos.split(',').map(p => p.trim()).filter(p => p)
          : data.photos
        : [];

      const projectData = {
        ...data,
        technologies: techArray,
        photos: photosArray
      };

      if (editingProject) {
        // Atualizar
        const { error } = await supabase
          .from('projects')
          .update(projectData)
          .eq('id', editingProject.id);

        if (error) throw error;
        toast.success('Projeto atualizado com sucesso!');
      } else {
        // Criar
        const { error } = await supabase
          .from('projects')
          .insert([projectData]);

        if (error) throw error;
        toast.success('Projeto criado com sucesso!');
      }

      setIsModalOpen(false);
      loadProjects();
    } catch (error: any) {
      toast.error('Erro ao salvar: ' + error.message);
    }
  };

  // Deletar projeto
  const deleteProject = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este projeto?')) return;

    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Projeto excluído com sucesso!');
      loadProjects();
    } catch (error: any) {
      toast.error('Erro ao excluir: ' + error.message);
    }
  };

  // Tela de login
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-4">
        <Toaster position="top-right" />
        
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 max-w-md w-full">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Admin Login</h1>
            <p className="text-teal-200">Acesso restrito ao administrador</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-teal-300 mb-2">Email</label>
              <input
                type="email"
                name="email"
                required
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-teal-500 transition-colors"
                placeholder="seu@email.com"
              />
            </div>
            
            <div>
              <label className="block text-teal-300 mb-2">Senha</label>
              <input
                type="password"
                name="password"
                required
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-teal-500 transition-colors"
                placeholder="••••••••"
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-lg font-medium transition-colors duration-300"
              disabled={authLoading}
            >
              {authLoading ? 'Verificando...' : 'Entrar'}
            </button>
          </form>
          
          <p className="text-white/40 text-sm text-center mt-6">
            Apenas o administrador tem acesso
          </p>
        </div>
      </div>
    );
  }

  // Tela principal do admin
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-4 md:p-8">
      <Toaster 
        position="top-right"
        toastOptions={{
          style: {
            background: '#1f2937',
            color: '#fff',
            border: '1px solid #374151'
          }
        }}
      />
      
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Gerenciar Projetos
            </h1>
            <p className="text-teal-200 mt-2">
              {projects.length} projeto(s) cadastrado(s)
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg transition-colors duration-300 text-sm"
            >
              <FaSignOutAlt />
              Sair
            </button>
            <button
              onClick={openCreateModal}
              className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300"
            >
              <FaPlus />
              Novo Projeto
            </button>
          </div>
        </div>

        {/* Tabela de projetos */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-4 px-6 text-teal-300 font-semibold">Nome</th>
                  <th className="text-left py-4 px-6 text-teal-300 font-semibold">Tecnologias</th>
                  <th className="text-left py-4 px-6 text-teal-300 font-semibold">Links</th>
                  <th className="text-left py-4 px-6 text-teal-300 font-semibold">Ações</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-white/60">
                      Carregando projetos...
                    </td>
                  </tr>
                ) : projects.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-white/60">
                      Nenhum projeto encontrado. Crie seu primeiro projeto!
                    </td>
                  </tr>
                ) : (
                  projects.map((project) => (
                    <tr key={project.id} className="border-b border-white/10 hover:bg-white/5">
                      <td className="py-4 px-6">
                        <div>
                          <h3 className="text-white font-medium">{project.name}</h3>
                          <p className="text-teal-200 text-sm mt-1 line-clamp-2">
                            {project.description.substring(0, 100)}...
                          </p>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex flex-wrap gap-2">
                          {project.technologies?.slice(0, 3).map((tech, index) => (
                            <span 
                              key={index}
                              className="px-3 py-1 bg-white/10 text-teal-200 text-xs rounded-full"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.technologies?.length > 3 && (
                            <span className="px-3 py-1 bg-white/5 text-white/60 text-xs rounded-full">
                              +{project.technologies.length - 3}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex gap-3">
                          {project.github_link && (
                            <a
                              href={project.github_link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-white/70 hover:text-white"
                              title="GitHub"
                            >
                              <FaGithub size={18} />
                            </a>
                          )}
                          {project.live_url && (
                            <a
                              href={project.live_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-white/70 hover:text-white"
                              title="Demo"
                            >
                              <FaExternalLinkAlt size={16} />
                            </a>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex gap-3">
                          <button
                            onClick={() => openEditModal(project)}
                            className="p-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 rounded-lg transition-colors duration-300"
                            title="Editar"
                          >
                            <FaEdit size={16} />
                          </button>
                          <button
                            onClick={() => deleteProject(project.id)}
                            className="p-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg transition-colors duration-300"
                            title="Excluir"
                          >
                            <FaTrash size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal de criação/edição */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-gray-900 border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-white">
                    {editingProject ? 'Editar Projeto' : 'Novo Projeto'}
                  </h2>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="text-white/60 hover:text-white text-2xl"
                  >
                    ×
                  </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div>
                    <label className="block text-teal-300 mb-2">Nome do Projeto *</label>
                    <input
                      {...register('name', { required: 'Nome é obrigatório' })}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-teal-500 transition-colors"
                      placeholder="Ex: E-commerce Platform"
                    />
                    {errors.name && (
                      <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-teal-300 mb-2">Descrição *</label>
                    <textarea
                      {...register('description', { required: 'Descrição é obrigatória' })}
                      rows={4}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-teal-500 transition-colors"
                      placeholder="Descreva o projeto..."
                    />
                    {errors.description && (
                      <p className="text-red-400 text-sm mt-1">{errors.description.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-teal-300 mb-2">
                      Tecnologias (separadas por vírgula) *
                    </label>
                    <input
                      {...register('technologies', { required: 'Tecnologias são obrigatórias' })}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-teal-500 transition-colors"
                      placeholder="Ex: Next.js, TypeScript, Tailwind CSS, PostgreSQL"
                      defaultValue={
                        editingProject?.technologies
                          ? editingProject.technologies.join(', ')
                          : ''
                      }
                    />
                    <p className="text-white/60 text-sm mt-1">
                      Separe cada tecnologia com vírgula
                    </p>
                    {errors.technologies && (
                      <p className="text-red-400 text-sm mt-1">{errors.technologies.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-teal-300 mb-2">
                      URLs das Fotos (separadas por vírgula)
                    </label>
                    <input
                      {...register('photos')}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-teal-500 transition-colors"
                      placeholder="Ex: https://exemplo.com/foto1.jpg, https://exemplo.com/foto2.jpg"
                      defaultValue={
                        editingProject?.photos
                          ? editingProject.photos.join(', ')
                          : ''
                      }
                    />
                    <p className="text-white/60 text-sm mt-1">
                      URLs das imagens do projeto (opcional)
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-teal-300 mb-2">Link do GitHub *</label>
                      <input
                        {...register('github_link', { 
                          required: 'Link do GitHub é obrigatório',
                          pattern: {
                            value: /^(https?:\/\/)/,
                            message: 'URL inválida'
                          }
                        })}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-teal-500 transition-colors"
                        placeholder="https://github.com/usuario/projeto"
                      />
                      {errors.github_link && (
                        <p className="text-red-400 text-sm mt-1">{errors.github_link.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-teal-300 mb-2">Link da Demo (opcional)</label>
                      <input
                        {...register('live_url', {
                          pattern: {
                            value: /^(https?:\/\/|$)/,
                            message: 'URL inválida'
                          }
                        })}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-teal-500 transition-colors"
                        placeholder="https://projeto-demo.vercel.app"
                      />
                      {errors.live_url && (
                        <p className="text-red-400 text-sm mt-1">{errors.live_url.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-end gap-4 pt-6 border-t border-white/10">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="px-6 py-3 border border-white/20 text-white rounded-lg hover:bg-white/10 transition-colors duration-300"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg transition-colors duration-300"
                    >
                      {editingProject ? 'Atualizar' : 'Criar'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}