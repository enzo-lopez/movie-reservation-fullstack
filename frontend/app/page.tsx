import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

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
    __v: 0,
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
    __v: 0,
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
    __v: 0,
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
    __v: 0,
  },
  // Agrega más películas aquí
]

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Películas en Cartelera</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <Link href={`/movie/${movie._id}`} key={movie._id}>
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <img src={movie.poster || "/placeholder.svg"} alt={movie.title} className="w-full h-auto mb-2" />
                <h2 className="text-lg font-semibold">{movie.title}</h2>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
