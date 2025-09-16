"use client"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"

import { DataTable } from "@/components/DataTable"
import { columns, User } from "@/components/columns"
import { AddUserForm } from "@/components/AddUserForm"

// Hard code for now
const data: User[] = [
    { id: "1", name: "Emily Dubuque", email: "emily@example.com" },
    { id: "2", name: "Wyat Harmon", email: "wyat@example.com" },
  ]

export function OpenButton() {
    return (
        <div className="bg-[#034F54] rounded-xl w-14 p-1 text-center">
            <Popover>
                <PopoverTrigger className="text-white">Open</PopoverTrigger>
                <PopoverContent className="w-[70vw] max-w-3xl h-[60vh] p-6 rounded-xl shadow-lg mx-auto my-12">
                    <h2 className="text-xl font-bold mb-4 text-center">Users</h2>

                    {/* Scrollable table if needed */}
                    <div className="overflow-auto h-full">
                        <DataTable columns={columns} data={data} />
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
}

export function AddButton() {
    return (
        <div className="bg-[#034F54] rounded-xl w-14 p-1 text-center">
            <Popover>
                <PopoverTrigger className="text-white">Add</PopoverTrigger>
                <PopoverContent className="w-[70vw] max-w-3xl h-[60vh] p-6 rounded-xl shadow-lg mx-auto my-12">
                    <h2 className="text-xl font-bold mb-4 text-center">Users</h2>

                    {/* Scrollable table if needed */}
                    <div className="overflow-auto h-full">
                        <DataTable columns={columns} data={data} />
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
}

export function CompareButton() {
    return (
        <div className="bg-[#034F54] rounded-xl px-4 py-2 text-center leading-none">
            <Popover>
                <PopoverTrigger className="text-white">Compare</PopoverTrigger>
                <PopoverContent className="w-[70vw] max-w-3xl h-[60vh] p-6 rounded-xl shadow-lg mx-auto my-12">
                    <h2 className="text-xl font-bold mb-4 text-center">Users</h2>

                    {/* Scrollable table if needed */}
                    <div className="overflow-auto h-full">
                        <DataTable columns={columns} data={data} />
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
}