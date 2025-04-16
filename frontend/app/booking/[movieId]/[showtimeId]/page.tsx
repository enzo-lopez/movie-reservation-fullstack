"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAppContext } from "../../../contexts/AppContext"
import { Button } from "@/components/ui/button"

const seats = [
  { row: "A", numberSeat: 1, isAvailable: false },
  { row: "A", numberSeat: 2, isAvailable: true },
  { row: "A", numberSeat: 3, isAvailable: false },
  { row: "B", numberSeat: 1, isAvailable: true },
  { row: "B", numberSeat: 2, isAvailable: true },
  { row: "B", numberSeat: 3, isAvailable: true },
  // Agrega más asientos aquí
]

export default function Booking({ params }: { params: { movieId: string; showtimeId: string } }) {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([])
  const { user } = useAppContext()
  const router = useRouter()

  if (!user) {
    router.push("/login")
    return null
  }

  const toggleSeat = (row: string, numberSeat: number) => {
    const seatId = `${row}${numberSeat}`
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatId))
    } else {
      setSelectedSeats([...selectedSeats, seatId])
    }
  }

  const handleBooking = () => {
    console.log("Asientos seleccionados:", selectedSeats)
    // Aquí iría la lógica para procesar la reserva
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Selecciona tus asientos</h1>
      <div className="grid grid-cols-3 gap-4 mb-6">
        {seats.map((seat) => (
          <Button
            key={`${seat.row}${seat.numberSeat}`}
            disabled={!seat.isAvailable}
            variant={selectedSeats.includes(`${seat.row}${seat.numberSeat}`) ? "default" : "outline"}
            onClick={() => toggleSeat(seat.row, seat.numberSeat)}
          >
            {seat.row}
            {seat.numberSeat}
          </Button>
        ))}
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Asientos seleccionados:</h2>
        <p>{selectedSeats.join(", ") || "Ninguno"}</p>
      </div>
      <Button onClick={handleBooking} disabled={selectedSeats.length === 0}>
        Reservar
      </Button>
    </div>
  )
}

