"use client"

import Link from "next/link"
import { useAppContext } from "../contexts/AppContext"
import { Button } from "@/components/ui/button"
import { Moon, Sun, History } from "lucide-react"

export default function Navbar() {
  const { isDarkMode, toggleDarkMode, user, logout } = useAppContext()

  return (
    <nav className="bg-gray-100 dark:bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Cinema Tickets
        </Link>
        <div className="flex items-center space-x-4">
          <Button onClick={toggleDarkMode} variant="ghost" size="icon">
            {isDarkMode ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
          </Button>
          {user ? (
            <>
              <span>Hola, {user.username}</span>
              <Link href="/reservations">
                <Button variant="outline">
                  Mis reservas
                </Button>
              </Link>
              {user.role === "ADMIN" && (
                <Link href="/admin">
                  <Button variant="outline">Admin Panel</Button>
                </Link>
              )}
              <Button onClick={logout}>Cerrar sesión</Button>
            </>
          ) : (
            <Link href="/login">
              <Button>Iniciar sesión</Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}
