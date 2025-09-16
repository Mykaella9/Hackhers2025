"use client"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"

import { DataTable } from "@/components/DataTable"
import {columns} from "@/components/columns"
import {User} from "@prisma/client"
import {AddUserForm} from "@/components/AddUser"
import { CompareForm } from "@/components/CompareForm"


import { entColumns, Entitlement } from "@/components/entColumns"


type PopButtonProps = {
    users: User[]
}

// Hard code for now
// const data: User[] = [
//     { id: "1", name: "Emily Dubuque", email: "emily@example.com" },
//     { id: "2", name: "Wyat Harmon", email: "wyat@example.com" },
//   ]

export function OpenButton({users}: PopButtonProps) {
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

export function AddButton({users}: PopButtonProps) {
    return (
        <div className="bg-[#034F54] rounded-xl w-14 p-1 text-center">
            <Popover>
                <PopoverTrigger className="text-white">Add</PopoverTrigger>
                <PopoverContent className="w-[70vw] max-w-3xl h-[60vh] p-6 rounded-xl shadow-lg mx-auto my-12">
                    <h2 className="text-xl font-bold mb-4 text-center">Users</h2>

                    {/* Scrollable table if needed */}
                    <div className="overflow-auto h-full">
                        <AddUserForm></AddUserForm>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
}

// export function CompareButton({users}: PopButtonProps) {
//     return (
//         <div className="bg-[#034F54] rounded-xl px-4 py-2 text-center leading-none">
//             <Popover>
//                 <PopoverTrigger className="text-white">Compare</PopoverTrigger>
//                 <PopoverContent className="w-[70vw] max-w-3xl h-[60vh] p-6 rounded-xl shadow-lg mx-auto my-12">
//                     <h2 className="text-xl font-bold mb-4 text-center">Users</h2>

//                     {/* Scrollable table if needed */}
//                     <div className="overflow-auto h-full">
//                         <DataTable
//                                 columns={columns}
//                                 data={users.map(user => ({
//                                     id: user.id.toString(),
//                                     name: `${user.firstName} ${user.lastName}`
//                                 }))}
//                         />
//                     </div>
//                 </PopoverContent>
//             </Popover>
//         </div>
//     );
// }

type CompareButtonProps = {
    users: { id: number; firstName: string; lastName: string }[]
  }
  
  export function CompareButton({ users }: CompareButtonProps) {
    return (
      <div className="bg-[#034F54] rounded-xl px-4 py-2 text-center leading-none">
        <Popover>
          <PopoverTrigger className="text-white">Compare</PopoverTrigger>
          <PopoverContent className="w-[70vw] max-w-3xl h-[70vh] p-6 rounded-xl shadow-lg mx-auto my-12">
            <h2 className="text-xl font-bold mb-4 text-center">Compare Users</h2>
            <CompareForm users={users} />
          </PopoverContent>
        </Popover>
      </div>
    )
  }


type EntButtonProps = {
    entitlements: Entitlement[]
  }

export function EntButton({ entitlements }: EntButtonProps) {
    return (
        <div className="bg-[#034F54] rounded-xl px-4 py-2 text-center leading-none">
            <Popover>
                <PopoverTrigger className="text-white">Entitlements</PopoverTrigger>
                <PopoverContent className="w-[70vw] max-w-3xl h-[60vh] p-6 rounded-xl shadow-lg mx-auto my-12">
                    <h2 className="text-xl font-bold mb-4 text-center">Users</h2>

                    {/* Scrollable table if needed */}
                    <div className="overflow-auto h-full">
                        <DataTable
                            columns={entColumns}
                            data={entitlements.map(ent => ({
                                id: ent.id,
                                name: ent.name,
                                type: ent.type,
                                level: ent.level,
                                description: ent.description,
                            }))}
                        />

                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
}


