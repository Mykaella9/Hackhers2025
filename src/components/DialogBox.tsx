"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"

import { DataTable } from "@/components/DataTable"
import {columns} from "@/components/columns"
import {User} from "@prisma/client"
import {AddUserForm} from "@/components/AddUser"
import { CompareForm } from "@/components/CompareForm"
import { entColumns, Entitlement } from "@/components/entColumns"


type PopButtonProps = {
    users: User[]
}

type CompareButtonProps = {
  users: { id: number; firstName: string; lastName: string }[]
  }

  type EntButtonProps = {
    entitlements: Entitlement[]
  }
  

export function OpenDialog({ users }: PopButtonProps) {
  return (
    <div className="bg-[#034F54] rounded-xl w-30 p-2 text-center">
      <Dialog>
        <DialogTrigger className="text-white font-extrabold">
          Members
        </DialogTrigger>
        <DialogContent className="!max-w-none w-[65vw] h-[85vh] p-6 rounded-xl shadow-lg bg-[#F5F5F5] text-3xl font-bold">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold text-center mb-4">
              Team Members:
            </DialogTitle>
          </DialogHeader>
          <div className="overflow-auto h-full">
              <DataTable
                  columns={columns}
                  data={users.map(user => ({
                      id: user.id.toString(),
                      name: `${user.firstName} ${user.lastName}`
                  }))}
              />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export function AddDialog({ users }: PopButtonProps) {
  return (
    <div className="bg-[#034F54] rounded-xl w-30 p-2 text-center">
      <Dialog>
        <DialogTrigger className="text-white font-extrabold">
          Add
        </DialogTrigger>
        <DialogContent className="!max-w-none w-[65vw] h-[85vh] p-6 rounded-xl shadow-lg bg-[#F5F5F5] text-3xl font-bold">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold text-center mb-4">
              Add Members
            </DialogTitle>
          </DialogHeader>
          <div className="overflow-auto h-full">
            <AddUserForm></AddUserForm>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export function CompareDialog({ users }: CompareButtonProps) {
    return (
      <div className="bg-[#034F54] rounded-xl w-30 p-2 text-center">
        <Dialog>
          <DialogTrigger className="text-white font-extrabold">
            Compare
          </DialogTrigger>
          <DialogContent className="!max-w-none w-[65vw] h-[85vh] p-6 rounded-xl shadow-lg bg-[#F5F5F5]">
            <DialogHeader>
              <DialogTitle className="text-3xl font-bold text-center mb-2">
                Compare Entitlements:
              </DialogTitle>
            </DialogHeader>
            <CompareForm users={users} />
          </DialogContent>
        </Dialog>
      </div>
    )
  }


  export function EntDialog({ entitlements }: EntButtonProps) {
    return (
      <div className="bg-[#034F54] rounded-xl w-30 p-2 text-center">
        <Dialog>
          <DialogTrigger className="text-white font-extrabold">
            Entitlements
          </DialogTrigger>
          <DialogContent className="!max-w-none w-[65vw] h-[85vh] p-6 rounded-xl shadow-lg bg-[#F5F5F5] text-3xl font-bold">
            <DialogHeader>
              <DialogTitle className="text-3xl font-bold text-center mb-4">
                Role Entitlements:
              </DialogTitle>
            </DialogHeader>
            <div className="overflow-auto h-full">
              <DataTable
                  columns={entColumns}
                  data={entitlements.map(ent => ({
                      id: ent.id,
                      name: ent.name,
                      description: ent.description,
                  }))}
              />
          </div>
          </DialogContent>
        </Dialog>
      </div>
    )
  }