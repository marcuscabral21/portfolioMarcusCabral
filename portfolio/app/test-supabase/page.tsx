import { supabase } from '@/lib/supabase'

export default async function TestPage() {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .limit(3)

    if (error) {
      return (
        <div className="p-8">
          <h1 className="text-2xl text-red-600">Erro no Supabase:</h1>
          <pre className="bg-gray-900 text-white p-4 rounded mt-4">
            {JSON.stringify(error, null, 2)}
          </pre>
        </div>
      )
    }

    return (
      <div className="p-8">
        <h1 className="text-2xl text-green-600">✅ Conexão com Supabase OK!</h1>
        <p className="mt-2">Projetos encontrados: {data?.length || 0}</p>
        <pre className="bg-gray-900 text-white p-4 rounded mt-4">
          {JSON.stringify(data, null, 2)}
        </pre>
      </div>
    )
  } catch (err: any) {
    return (
      <div className="p-8">
        <h1 className="text-2xl text-red-600">Erro inesperado:</h1>
        <pre className="bg-gray-900 text-white p-4 rounded mt-4">
          {err.message}
        </pre>
      </div>
    )
  }
}