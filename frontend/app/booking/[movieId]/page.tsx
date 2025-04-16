"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useAppContext } from "../../contexts/AppContext"
import { Button } from "@/components/ui/button"

interface Seat {
  row: string
  numberSeat: number
  isAvaible: boolean
}

const seats: Seat[] = [
  { row: "A", numberSeat: 1, isAvaible: true },
  { row: "A", numberSeat: 2, isAvaible: true },
  { row: "A", numberSeat: 3, isAvaible: true },
  { row: "B", numberSeat: 1, isAvaible: true },
  { row: "B", numberSeat: 2, isAvaible: true },
  { row: "B", numberSeat: 3, isAvaible: true },
  // Add more seats as needed
]

export default function Booking({ params }: { params: { movieId: string } }) {
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([])
  const { user } = useAppContext()
  const router = useRouter()
  const searchParams = useSearchParams()

  const movie = searchParams.get("movie")
  const date = searchParams.get("date")
  const time = searchParams.get("time")

  useEffect(() => {
    if (!user) {
      router.push("/login")
    }
  }, [user, router])

  const toggleSeat = (seat: Seat) => {
    if (selectedSeats.some((s) => s.row === seat.row && s.numberSeat === seat.numberSeat)) {
      setSelectedSeats(selectedSeats.filter((s) => s.row !== seat.row || s.numberSeat !== seat.numberSeat))
    } else {
      setSelectedSeats([...selectedSeats, { ...seat, isAvaible: false }])
    }
  }

  const handleBooking = async () => {
    const reservationData = {
      movie,
      date,
      time,
      seats: selectedSeats,
    }

    try {
      const response = await fetch("/api/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reservationData),
      })

      if (response.ok) {
        const result = await response.json()
        const queryParams = new URLSearchParams({
          movieName: result.movieName,
          date: result.date,
          time: result.time,
          seats: JSON.stringify(result.seats),
        })
        router.push(`/reservation-success?${queryParams.toString()}`)
      } else {
        // Handle error
        console.error("Failed to create reservation")
      }
    } catch (error) {
      console.error("Error creating reservation:", error)
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Selecciona tus asientos</h1>
      <div className="grid grid-cols-3 gap-4 mb-6">
        {seats.map((seat) => (
          <Button
            key={`${seat.row}${seat.numberSeat}`}
            disabled={!seat.isAvaible}
            variant={
              selectedSeats.some((s) => s.row === seat.row && s.numberSeat === seat.numberSeat) ? "default" : "outline"
            }
            onClick={() => toggleSeat(seat)}
          >
            {seat.row}
            {seat.numberSeat}
          </Button>
        ))}
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Asientos seleccionados:</h2>
        <p>{selectedSeats.map((seat) => `${seat.row}${seat.numberSeat}`).join(", ") || "Ninguno"}</p>
      </div>
      <Button onClick={handleBooking} disabled={selectedSeats.length === 0}>
        Reservar
      </Button>
    </div>
  )
}

