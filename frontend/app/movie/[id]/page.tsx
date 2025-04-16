"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAppContext } from "../../contexts/AppContext"
import { Button } from "@/components/ui/button"
import { format, addDays } from "date-fns"
import { es } from "date-fns/locale"

// Función para buscar la película por ID en el array de películas
const findMovieById = (id: string) => {
  const movies = [
    {
      _id: "673a3faa8cf566545da1eea8",
      title: "El Padrino",
      description:
        "El patriarca de una dinastía del crimen organizado transfiere el control de su imperio clandestino a su reacio hijo.",
      poster:
        "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
      duration: "175 min",
      trailer: "https://www.youtube.com/watch?v=sY1S34973zA",
      genre: ["Crime", "Drama"],
    },
    {
      _id: "673a43c2b433c6ec395c13c5",
      title: "Pulp Fiction",
      description:
        "Las vidas de dos sicarios, un boxeador, la esposa de un gángster y un par de bandidos se entrelazan en cuatro historias de violencia y redención.",
      poster:
        "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
      duration: "154 min",
      trailer: "https://www.youtube.com/watch?v=s7EdQ4FqbhY",
      genre: ["Crime", "Drama"],
    },
    {
      _id: "673a43d2809995cd6c6beada",
      title: "El Señor de los Anillos: La Comunidad del Anillo",
      description:
        "Un hobbit de la Comarca y sus ocho compañeros emprenden un viaje para destruir el poderoso Anillo Único y salvar la Tierra Media del Señor Oscuro Sauron.",
      poster:
        "https://m.media-amazon.com/images/M/MV5BN2EyZjM3NzUtNWUzMi00MTgxLWI0NTctMzY4M2VlOTdjZWRiXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_SX300.jpg",
      duration: "178 min",
      trailer: "https://www.youtube.com/watch?v=V75dMMIW2B4",
      genre: ["Adventure", "Fantasy"],
    },
    {
      _id: "673a45acc477dbf8de2e04c5",
      title: "Inception",
      description:
        "A un ladrón que roba secretos corporativos mediante el uso de la tecnología para compartir sueños, se le da la tarea inversa de plantar una idea en la mente de un jefe de una gran empresa.",
      poster: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
      duration: "148 min",
      trailer: "https://www.youtube.com/watch?v=YoHD9XEInc0",
      genre: ["Action", "Sci-Fi"],
    },
    {
      _id: "673a45fcc477dbf8de2e04cd",
      title: "El Resplandor",
      description:
        "Jack Torrance se convierte en cuidador de invierno en el Hotel Overlook, en Colorado, con la esperanza de vencer su bloqueo con la escritura. Se instala allí junto con su esposa, Wendy, y su hijo, Danny, que está plagado de premoniciones psíquicas. Mientras la escritura de Jack no fluye y las visiones de Danny se vuelven más perturbadoras, Jack descubre los oscuros secretos del hotel y comienza a transformarse en un maníaco homicida, empeñado en aterrorizar a su familia.",
      poster:
        "https://m.media-amazon.com/images/M/MV5BZWFlYmY2MGEtZjVkYS00YzU4LTg0YjQtYzY1ZGE3NTA5NGQxXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
      duration: "2h 26min",
      genre: ["Terror"],
      showtimes: [
        { id: 1, time: "12:00" },
        { id: 2, time: "15:30" },
        { id: 3, time: "19:00" },
      ],
    },
  ]

  return movies.find((movie) => movie._id === id)
}

export default function MovieDetails({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { user } = useAppContext()
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedTime, setSelectedTime] = useState("")
  const [movie, setMovie] = useState<any>(null)

  useEffect(() => {
    // Buscar la película por ID
    const foundMovie = findMovieById(params.id)
    if (foundMovie) {
      setMovie(foundMovie)
    }
  }, [params.id])

  const dates = Array.from({ length: 5 }, (_, i) => addDays(new Date(), i))

  const handleBooking = () => {
    if (user && movie) {
      const bookingData = {
        movie: movie._id,
        date: format(selectedDate, "yyyy-MM-dd"),
        time: selectedTime,
      }
      router.push(`/booking/${params.id}?${new URLSearchParams(bookingData as any).toString()}`)
    } else {
      router.push("/login")
    }
  }

  if (!movie) {
    return <div>Cargando película...</div>
  }

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="w-full md:w-1/3">
        <img
          src={movie.poster || "/placeholder.svg"}
          alt={movie.title}
          className="w-full h-auto rounded-lg shadow-md"
          onError={(e) => {
            e.currentTarget.src = `/placeholder.svg?height=346&width=300`
          }}
        />
      </div>
      <div className="w-full md:w-2/3">
        <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
        <div className="flex space-x-4 mb-4 text-sm text-gray-600 dark:text-gray-400">
          <span>{Array.isArray(movie.genre) ? movie.genre.join(", ") : movie.genre}</span>
          <span>•</span>
          <span>{movie.duration}</span>
        </div>
        <p className="mb-6">{movie.description}</p>
        <h2 className="text-2xl font-semibold mb-4">Fechas y Horarios</h2>
        <div className="flex space-x-2 mb-4 overflow-x-auto">
          {dates.map((date) => (
            <Button
              key={date.toISOString()}
              variant={selectedDate.toDateString() === date.toDateString() ? "default" : "outline"}
              onClick={() => setSelectedDate(date)}
            >
              {format(date, "d MMM", { locale: es })}
            </Button>
          ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {(
            movie.showtimes || [
              { id: 1, time: "12:00" },
              { id: 2, time: "15:30" },
              { id: 3, time: "19:00" },
            ]
          ).map((showtime:(any)) => (
            <Button
              key={showtime.id}
              variant={selectedTime === showtime.time ? "default" : "outline"}
              onClick={() => setSelectedTime(showtime.time)}
            >
              {showtime.time}
            </Button>
          ))}
        </div>
        <Button className="mt-6" onClick={handleBooking} disabled={!selectedTime}>
          Reservar
        </Button>
      </div>
    </div>
  )
}
