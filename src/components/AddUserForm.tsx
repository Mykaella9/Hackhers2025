"use client"

import { useState } from "react"
import { Combobox } from "@/components/ui/combobox"
import { Button } from "@/components/ui/button"

const mockUsers = [
  { value: "1", label: "Alice Smith (alice@example.com)" },
  { value: "2", label: "Bob Jones (bob@example.com)" },
  { value: "3", label: "Charlie Doe (charlie@example.com)" },
]

export function AddUserForm() {
  const [selectedUser, setSelectedUser] = useState<string | null>(null)

  const handleAddUser = () => {
    if (!selectedUser) return
    console.log("Adding user:", selectedUser)
    // TODO: send to backend or update state
  }

  return (
    <div className="flex flex-col gap-4">
      <Combobox
        options={mockUsers}
        placeholder="Search users..."
        onChange={(val) => setSelectedUser(val)}
      />

      <Button
        onClick={handleAddUser}
        disabled={!selectedUser}
        className="w-full"
      >
        Add to Team
      </Button>
    </div>
  )
}
