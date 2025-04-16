"use client"

import { useState } from "react"
import { CrudTable } from "../components/crud-table"

interface User {
  id: string
  username: string
  email: string
  role: "USER" | "ADMIN"
}

const initialUsers: User[] = [
  { id: "1", username: "admin", email: "admin@example.com", role: "ADMIN" },
  { id: "2", username: "user1", email: "user1@example.com", role: "USER" },
]

export default function UsersPage() {
  const [users, setUsers] = useState(initialUsers)

  const columns = [
    { key: "username" as const, label: "Username" },
    { key: "email" as const, label: "Email" },
    { key: "role" as const, label: "Role" },
  ]

  const handleAdd = (user: Partial<User>) => {
    setUsers([...users, { ...user, id: Date.now().toString() } as User])
  }

  const handleEdit = (id: string, updatedUser: Partial<User>) => {
    setUsers(users.map((user) => (user.id === id ? { ...user, ...updatedUser } : user)))
  }

  const handleDelete = (id: string) => {
    setUsers(users.filter((user) => user.id !== id))
  }

  return (
    <CrudTable
      title="Users"
      items={users}
      columns={columns}
      onAdd={handleAdd}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  )
}

