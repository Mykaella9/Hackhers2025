"use client"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"

import { DataTable } from "@/components/DataTable"
import {columns} from "@/components/columns"
import {User} from "@prisma/client"

type PopButtonProps = {
    users: User[]
}

// Hard code for now
// const data: User[] = [
//     { id: "1", name: "Emily Dubuque", email: "emily@example.com" },
//     { id: "2", name: "Wyat Harmon", email: "wyat@example.com" },
//   ]

export default function PopButton({users}: PopButtonProps) {
    return (
        <div className="bg-[#7ECF1C] rounded-xl w-14 p-1 text-center">
            <Popover>
                <PopoverTrigger>Open</PopoverTrigger>
                <PopoverContent className="w-[70vw] max-w-3xl h-[60vh] p-6 rounded-xl shadow-lg mx-auto my-12">
                    <h2 className="text-xl font-bold mb-4 text-center">Users</h2>

                    {/* Scrollable table if needed */}
                    <div className="overflow-auto h-full">
                        <DataTable
                            columns={columns}
                            data={users.map(user => ({
                                id: user.id.toString(),
                                name: `${user.firstName} ${user.lastName}`
                            }))}
                        />
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    )
}