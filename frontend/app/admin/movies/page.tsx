"use client"

import { useState } from "react"
import { CrudTable } from "../components/crud-table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

interface Movie {
  _id: string
  title: string
  genre: string[]
  duration: string
  poster: string
  description: string
}

const initialMovies: Movie[] = [
  {
    _id: "673a3faa8cf566545da1eea8",
    title: "El Padrino",
    description:
      "El patriarca de una dinastía del crimen organizado transfiere el control de su imperio clandestino a su reacio hijo.",
    poster: "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
    duration: "175 min",
    genre: ["Sci-Fi", "Drama"],
  },
  {
    id: "2",
    title: "The Dark Knight",
    genre: ["Action", "Crime", "Drama"],
    duration: "2h 32min",
    poster: "/placeholder.svg?height=400&width=300",
    description:
      "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
  },
]

export default function MoviesPage() {
  const [movies, setMovies] = useState(initialMovies)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null)
  const [formData, setFormData] = useState<Partial<Movie>>({})

  const columns = [
    { key: "title" as const, label: "Title" },
    { key: "genre" as const, label: "Genre" },
    { key: "duration" as const, label: "Duration" },
    { key: "poster" as const, label: "Poster URL" },
  ]

  const handleAdd = (movie: Partial<Movie>) => {
    setMovies([...movies, { ...movie, id: Date.now().toString(), genre: movie.genre || [] } as Movie])
  }

  const handleEdit = (id: string, updatedMovie: Partial<Movie>) => {
    setMovies(movies.map((movie) => (movie.id === id ? { ...movie, ...updatedMovie } : movie)))
  }

  const handleDelete = (id: string) => {
    setMovies(movies.filter((movie) => movie.id !== id))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingMovie) {
      handleEdit(editingMovie.id, formData)
    } else {
      handleAdd(formData)
    }
    setFormData({})
    setEditingMovie(null)
    setIsDialogOpen(false)
  }

  const handleGenreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const genre = e.target.value.split(",").map((genre) => genre.trim())
    setFormData({ ...formData, genre })
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Movies</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setEditingMovie(null)
                setFormData({})
              }}
            >
              Add New
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingMovie ? "Edit" : "Add"} Movie</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <Input
                  value={formData.title || ""}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Genres (comma-separated)</label>
                <Input value={formData.genre?.join(", ") || ""} onChange={handleGenreChange} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Duration</label>
                <Input
                  value={formData.duration || ""}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Poster URL</label>
                <Input
                  value={formData.poster || ""}
                  onChange={(e) => setFormData({ ...formData, poster: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <Textarea
                  value={formData.description || ""}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
              <Button type="submit">{editingMovie ? "Update" : "Add"}</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="border rounded-lg">
        <table className="w-full">
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.key} className="p-2 text-left">
                  {column.label}
                </th>
              ))}
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie) => (
              <tr key={movie.id}>
                <td className="p-2">{movie.title}</td>
                <td className="p-2">{movie.genre.join(", ")}</td>
                <td className="p-2">{movie.duration}</td>
                <td className="p-2">{movie.poster}</td>
                <td className="p-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setEditingMovie(movie)
                      setFormData(movie)
                      setIsDialogOpen(true)
                    }}
                    className="mr-2"
                  >
                    Edit
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(movie.id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

