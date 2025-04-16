"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

interface CrudTableProps<T> {
  title: string
  items: T[]
  columns: { key: keyof T; label: string }[]
  onAdd: (item: Partial<T>) => void
  onEdit: (id: string, item: Partial<T>) => void
  onDelete: (id: string) => void
}

export function CrudTable<T extends { id: string }>({
  title,
  items,
  columns,
  onAdd,
  onEdit,
  onDelete,
}: CrudTableProps<T>) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<T | null>(null)
  const [formData, setFormData] = useState<Partial<T>>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingItem) {
      onEdit(editingItem.id, formData)
    } else {
      onAdd(formData)
    }
    setFormData({})
    setEditingItem(null)
    setIsAddDialogOpen(false)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{title}</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>Add New</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingItem ? "Edit" : "Add"} {title}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              {columns.map((column) => (
                <div key={String(column.key)}>
                  <label className="block text-sm font-medium mb-1">{column.label}</label>
                  <Input
                    value={(formData[column.key] as string) || ""}
                    onChange={(e) => setFormData({ ...formData, [column.key]: e.target.value })}
                  />
                </div>
              ))}
              <Button type="submit">{editingItem ? "Update" : "Add"}</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={String(column.key)}>{column.label}</TableHead>
              ))}
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                {columns.map((column) => (
                  <TableCell key={String(column.key)}>{String(item[column.key])}</TableCell>
                ))}
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setEditingItem(item)
                        setFormData(item)
                        setIsAddDialogOpen(true)
                      }}
                    >
                      Edit
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => onDelete(item.id)}>
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

