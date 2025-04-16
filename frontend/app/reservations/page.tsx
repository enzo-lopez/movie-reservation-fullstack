"use client"

import { useAppContext } from "../contexts/AppContext"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Mock data for reservations
const mockReservations = [
  {
    id: "1",
    movieTitle: "Inception",
    date: "2025-01-25",
    time: "14:30",
    seats: ["A1", "A2"],
  },
  {
    id: "2",
    movieTitle: "The Dark Knight",
    date: "2025-01-26",
    time: "17:00",
    seats: ["B3", "B4"],
  },
]

export default function ReservationsPage() {
  const { user } = useAppContext()
  const router = useRouter()

  if (!user) {
    router.push("/login")
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Mis Reservas</h1>
      <div className="grid gap-4">
        {mockReservations.map((reservation) => (
          <Card key={reservation.id}>
            <CardHeader>
              <CardTitle>{reservation.movieTitle}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                <p>Fecha: {reservation.date}</p>
                <p>Hora: {reservation.time}</p>
                <p>Asientos: {reservation.seats.join(", ")}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

