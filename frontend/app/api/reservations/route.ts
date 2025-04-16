import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const body = await request.json()

  // Here you would typically save the reservation to your database
  // For this example, we'll just echo back the received data with some modifications

  const response = {
    message: "Reservation created successfully",
    movieName: "El Resplandor", // This would typically come from your database
    date: body.date,
    time: body.time,
    seats: body.seats.map((seat: any) => ({
      ...seat,
      _id: Math.random().toString(36).substr(2, 9), // Generate a random ID
    })),
  }

  return NextResponse.json(response)
}

