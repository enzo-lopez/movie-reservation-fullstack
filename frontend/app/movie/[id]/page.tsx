'use client'

import {useEffect, useState} from 'react'
import {useRouter} from 'next/navigation'
import {useAppContext} from '../../contexts/AppContext'
import {Button} from '@/components/ui/button'
import {format, addDays} from 'date-fns'
import {es} from 'date-fns/locale'

/*
const movieDetails = {
  id: "673a45fcc477dbf8de2e04cd",
  title: "El Resplandor",
  genre: "Terror",
  duration: "2h 26min",
  poster: "/placeholder.svg?height=400&width=300",
  description:
    "Jack Torrance se convierte en cuidador de invierno en el Hotel Overlook, en Colorado, con la esperanza de vencer su bloqueo con la escritura. Se instala allí junto con su esposa, Wendy, y su hijo, Danny, que está plagado de premoniciones psíquicas. Mientras la escritura de Jack no fluye y las visiones de Danny se vuelven más perturbadoras, Jack descubre los oscuros secretos del hotel y comienza a transformarse en un maníaco homicida, empeñado en aterrorizar a su familia.",
  showtimes: [
    { id: 1, time: "12:00" },
    { id: 2, time: "15:30" },
    { id: 3, time: "19:00" },
  ],
}*/

export default function MovieDetails({params}: {params: {id: string}}) {
  const router = useRouter()
  const {user} = useAppContext()
  const [movieDetails, setMovieDetails] = useState<any>(null)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedTime, setSelectedTime] = useState('')

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const response = await fetch(`/api/movies/${params.id}`)
      const data = await response.json()
      data.showtimes = [
        {id: 1, time: '12:00'},
        {id: 2, time: '15:30'},
        {id: 3, time: '19:00'},
      ]
      setMovieDetails(data)
    }
    fetchMovieDetails()
  }, [params.id])

  const dates = Array.from({length: 5}, (_, i) => addDays(new Date(), i))

  const handleBooking = (showtimeId: number) => {
    if (user) {
      const bookingData = {
        movie: movieDetails.id,
        date: format(selectedDate, 'yyyy-MM-dd'),
        time: selectedTime,
      }
      router.push(
        `/booking/${params.id}?${new URLSearchParams(
          bookingData as any
        ).toString()}`
      )
    } else {
      router.push('/login')
    }
  }

  return (
    <div className='flex flex-col md:flex-row gap-8'>
      <img
        src={movieDetails.poster}
        alt={movieDetails.title}
        className='w-full md:w-1/3 h-auto'
      />
      <div className='w-full md:w-2/3'>
        <h1 className='text-3xl font-bold mb-4'>{movieDetails.title}</h1>
        <div className='flex space-x-4 mb-4 text-sm text-gray-600 dark:text-gray-400'>
          <span>{movieDetails.genre}</span>
          <span>•</span>
          <span>{movieDetails.duration}</span>
        </div>
        <p className='mb-6'>{movieDetails.description}</p>
        <h2 className='text-2xl font-semibold mb-4'>Fechas y Horarios</h2>
        <div className='flex space-x-2 mb-4 overflow-x-auto'>
          {dates.map(date => (
            <Button
              key={date.toISOString()}
              variant={
                selectedDate.toDateString() === date.toDateString()
                  ? 'default'
                  : 'outline'
              }
              onClick={() => setSelectedDate(date)}
            >
              {format(date, 'd MMM', {locale: es})}
            </Button>
          ))}
        </div>
        <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
          {movieDetails.showtimes.map((showtime: any) => (
            <Button
              key={showtime.id}
              variant={selectedTime === showtime.time ? 'default' : 'outline'}
              onClick={() => setSelectedTime(showtime.time)}
            >
              {showtime.time}
            </Button>
          ))}
        </div>
        <Button
          className='mt-6'
          onClick={() => handleBooking(1)}
          disabled={!selectedTime}
        >
          Reservar
        </Button>
      </div>
    </div>
  )
}
