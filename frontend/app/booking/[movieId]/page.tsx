'use client'

import {useState, useEffect} from 'react'
import {useParams, useRouter, useSearchParams} from 'next/navigation'
import {useAppContext} from '../../contexts/AppContext'
import {Button} from '@/components/ui/button'

interface Seat {
  row: string
  numberSeat: number
  isAvaible: boolean
}

const rows = ['A', 'B', 'C', 'D', 'E'] // Define las filas
const seatsPerRow = 7 // Define el número de columnas por fila

const generateSeats = (): Seat[] => {
  const seats: Seat[] = []

  rows.forEach(row => {
    for (let numberSeat = 1; numberSeat <= seatsPerRow; numberSeat++) {
      seats.push({row, numberSeat, isAvaible: true})
    }
  })

  return seats
}

const seats = generateSeats()

export default function Booking() {
  const params = useParams()
  const {movieId} = params
  const searchParams = useSearchParams()
  const movieName = searchParams.get('movie')
  const initialDate = searchParams.get('date')
  const initialTime = searchParams.get('time')

  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([])
  const [selectedDate, setSelectedDate] = useState<string>(initialDate || '') // Inicializa con el valor de los parámetros
  const [selectedTime, setSelectedTime] = useState<string>(initialTime || '') // Inicializa con el valor de los parámetros
  const {user} = useAppContext()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push('/login')
    }
  }, [user, router])

  const toggleSeat = (seat: Seat) => {
    if (
      selectedSeats.some(
        s => s.row === seat.row && s.numberSeat === seat.numberSeat
      )
    ) {
      setSelectedSeats(
        selectedSeats.filter(
          s => s.row !== seat.row || s.numberSeat !== seat.numberSeat
        )
      )
    } else {
      setSelectedSeats([...selectedSeats, {...seat, isAvaible: false}])
    }
  }

  const handleBooking = async () => {
    if (!user) {
      alert('Debes iniciar sesión para realizar una reserva.')
      router.push('/login')
      return
    }

    const reservationData = {
      userId: user.id,
      movieId: movieId,
      movie: movieId,
      date: selectedDate,
      time: selectedTime,
      seats: selectedSeats,
    }

    try {
      console.log('Datos de reserva:', reservationData) // Verifica los datos de reserva
      const response = await fetch('http://localhost:3001/reservation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Token JWT
        },
        body: JSON.stringify(reservationData),
      })

      if (response.ok) {
        const result = await response.json()
        router.push(
          `/reservation-success?${new URLSearchParams(result).toString()}`
        )
      } else {
        console.error('Error al crear la reserva: ', response.statusText)
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <div>
      <h1 className='text-3xl font-bold mb-6'>{movieName || 'Película'}</h1>{' '}
      {/* Muestra el nombre de la película */}
      <div className='flex items-center gap-4 mb-4'>
        {' '}
        {/* Muestra fecha y hora en la misma fila */}
        <div>
          <label className='block text-sm font-medium mb-1'>Fecha</label>
          <input
            type='date'
            className='border rounded p-2'
            value={selectedDate} // Asegúrate de que sea un valor válido
            onChange={e => setSelectedDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label className='block text-sm font-medium mb-1'>Hora</label>
          <input
            type='time'
            className='border rounded p-2'
            value={selectedTime} // Asegúrate de que sea un valor válido
            onChange={e => setSelectedTime(e.target.value)}
            required
          />
        </div>
      </div>
      <div className='space-y-4 mb-6'>
        {rows.map(row => (
          <div key={row} className='flex justify-center gap-4'>
            {seats
              .filter(seat => seat.row === row)
              .map(seat => (
                <Button
                  key={`${seat.row}${seat.numberSeat}`}
                  disabled={!seat.isAvaible}
                  variant={
                    selectedSeats.some(
                      s =>
                        s.row === seat.row && s.numberSeat === seat.numberSeat
                    )
                      ? 'default'
                      : 'outline'
                  }
                  onClick={() => toggleSeat(seat)}
                >
                  {seat.row}
                  {seat.numberSeat}
                </Button>
              ))}
          </div>
        ))}
      </div>
      <div className='mb-4'>
        <h2 className='text-xl font-semibold'>Asientos seleccionados:</h2>
        <p>
          {selectedSeats
            .map(seat => `${seat.row}${seat.numberSeat}`)
            .join(', ') || 'Ninguno'}
        </p>
      </div>
      <Button onClick={handleBooking} disabled={selectedSeats.length === 0}>
        Reservar
      </Button>
    </div>
  )
}
