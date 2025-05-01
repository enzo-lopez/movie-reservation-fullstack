'use client'

import {useState, useEffect} from 'react'
import {CrudTable} from '../components/crud-table'

interface User {
  id: string
  username: string
  email: string
  role: 'USER' | 'ADMIN'
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          `http://localhost:${process.env.NEXT_PUBLIC_PORT_BACKEND}/user`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`, // Si necesitas autenticación
            },
          }
        )

        if (!response.ok) {
          throw new Error('Error al obtener los usuarios')
        }

        const data = await response.json()
        console.log(data)
        setUsers(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido')
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  const columns = [
    {key: 'username' as const, label: 'Username'},
    {key: 'email' as const, label: 'Email'},
    {key: 'role' as const, label: 'Role'},
  ]

  const handleAdd = (user: Partial<User>) => {
    setUsers([...users, {...user, id: Date.now().toString()} as User])
  }

  const handleEdit = (id: string, updatedUser: Partial<User>) => {
    setUsers(
      users.map(user => (user.id === id ? {...user, ...updatedUser} : user))
    )
  }

  const handleDelete = (id: string) => {
    setUsers(users.filter(user => user.id !== id))
  }

  if (loading) {
    return <p>Cargando usuarios...</p>
  }

  if (error) {
    return <p>Error: {error}</p>
  }

  return (
    <CrudTable
      title='Users'
      items={users}
      columns={columns}
      onAdd={handleAdd}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  )
}
