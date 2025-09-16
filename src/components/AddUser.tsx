"use client"

import { useState } from "react"
import {Selects} from "@/components/Select"
import {SubmitButton} from "@/components/SubmitButton"


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

        <div className="flex flex-col gap-4">
            <Selects
            placeholder="Pick a user"
            value={selectedUser ?? ""}
            onValueChange={setSelectedUser}
            options={mockUsers} // ✅ already {value, label}
            />

            <p>Selected user id: {selectedUser}</p>
        </div>

      <SubmitButton
        onClick={handleAddUser}
        disabled={!selectedUser}
        className="w-full"
      >
        Add to Team
      </SubmitButton>
    </div>
  )
}