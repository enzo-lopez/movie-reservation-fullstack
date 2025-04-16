'use client'
import {useEffect, useState} from 'react'
import Link from 'next/link'
import {Card, CardContent} from '@/components/ui/card'

export default function Home() {
  const [movies, setMovies] = useState<
    {_id: string; title: string; poster?: string}[]
  >([]) // Estado para almacenar las películas
  const [loading, setLoading] = useState(true) // Estado para manejar el estado de carga
  const [error, setError] = useState<string | null>(null) // Estado para manejar errores

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('http://localhost:3001/movie/')
        if (!response.ok) {
          throw new Error('Error al obtener las películas')
        }
        const data = await response.json()
        setMovies(data) // Actualiza el estado con las películas obtenidas
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido') // Maneja errores
      } finally {
        setLoading(false) // Finaliza el estado de carga
      }
    }

    fetchMovies()
  }, []) // El array vacío asegura que solo se ejecute una vez al montar el componente

  if (loading) {
    return <p>Cargando películas...</p> // Muestra un mensaje mientras se cargan los datos
  }

  if (error) {
    return <p>Error: {error}</p> // Muestra un mensaje de error si ocurre un problema
  }

  return (
    <div>
      <h1 className='text-3xl font-bold mb-6'>Películas en Cartelera</h1>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {movies.map(movie => (
          <Link href={`/movie/${movie._id}`} key={movie._id}>
            <Card className='hover:shadow-lg transition-shadow'>
              <CardContent className='p-4'>
                <img
                  src={movie.poster || '/placeholder.svg'}
                  alt={movie.title}
                  className='w-full h-auto mb-2'
                />
                <h2 className='text-lg font-semibold'>{movie.title}</h2>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
