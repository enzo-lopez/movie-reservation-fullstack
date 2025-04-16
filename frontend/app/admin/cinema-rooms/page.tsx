"use client"

import { useState } from "react"
import { CrudTable } from "../components/crud-table"

interface CinemaRoom {
  id: string
  name: string
  capacity: string
  status: "Active" | "Maintenance"
}

const initialRooms: CinemaRoom[] = [
  { id: "1", name: "Sala 1", capacity: "100", status: "Active" },
  { id: "2", name: "Sala 2", capacity: "80", status: "Active" },
  { id: "3", name: "Sala 3", capacity: "120", status: "Maintenance" },
]

export default function CinemaRoomsPage() {
  const [rooms, setRooms] = useState(initialRooms)

  const columns = [
    { key: "name" as const, label: "Name" },
    { key: "capacity" as const, label: "Capacity" },
    { key: "status" as const, label: "Status" },
  ]

  const handleAdd = (room: Partial<CinemaRoom>) => {
    setRooms([...rooms, { ...room, id: Date.now().toString() } as CinemaRoom])
  }

  const handleEdit = (id: string, updatedRoom: Partial<CinemaRoom>) => {
    setRooms(rooms.map((room) => (room.id === id ? { ...room, ...updatedRoom } : room)))
  }

  const handleDelete = (id: string) => {
    setRooms(rooms.filter((room) => room.id !== id))
  }

  return (
    <CrudTable
      title="Cinema Rooms"
      items={rooms}
      columns={columns}
      onAdd={handleAdd}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  )
}
