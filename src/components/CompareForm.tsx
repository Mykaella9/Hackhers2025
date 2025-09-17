"use client"

import { useState } from "react"
import { Selects } from "@/components/Select"
import { SubmitButton } from "@/components/SubmitButton"

type CompareFormProps = {
  users: { id: number; firstName: string; lastName: string }[]
}

type Entitlement = {
  id: number
  name: string
  type: string
  level: number
  description: string
}

export function CompareForm({ users }: CompareFormProps) {
  const [userA, setUserA] = useState<string>("")
  const [userB, setUserB] = useState<string>("")
  const [results, setResults] = useState<{ onlyA: Entitlement[]; onlyB: Entitlement[] } | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!userA || !userB || userA === userB) return
  
    // Fetch entitlements for both users
    const [resA, resB] = await Promise.all([
      fetch(`/api/user-entitlements?userId=${userA}`),
      fetch(`/api/user-entitlements?userId=${userB}`),
    ])
  
    const [dataA, dataB] = await Promise.all([resA.json(), resB.json()])
  
    const setA = new Set(dataA.entitlements.map((e: Entitlement) => e.id))
    const setB = new Set(dataB.entitlements.map((e: Entitlement) => e.id))
  
    const onlyA = dataA.entitlements.filter((e: Entitlement) => !setB.has(e.id))
    const onlyB = dataB.entitlements.filter((e: Entitlement) => !setA.has(e.id))
  
    setResults({ onlyA, onlyB })
  }

  const options = users.map(u => ({
    value: u.id.toString(),
    label: `${u.firstName} ${u.lastName}`,
  }))

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4">
      <div className="grid grid-cols-2 gap-2 w-full max-w-md mx-auto">
        <Selects
          placeholder="Select User A"
          value={userA}
          onValueChange={setUserA}
          options={options}
        />
        <Selects
          placeholder="Select User B"
          value={userB}
          onValueChange={setUserB}
          options={options}
        />
      </div>
      <SubmitButton className="bg-[#034F54] rounded-xl w-30 p-2 text-center text-white font-extrabold" type="submit">Compare</SubmitButton>

      {results && (
        <div className="mt-6 grid grid-cols-2 gap-6 w-full max-w-2xl">
          <div className="text-center">
            <h3 className="font-semibold mb-2">
              Only {options.find(o => o.value === userA)?.label}
            </h3>
            <ul className="list-disc list-inside">
              {results.onlyA.length > 0 ? (
                results.onlyA.map(ent => <li key={ent.id}>{ent.name}</li>)
              ) : (
                <li>None</li>
              )}
            </ul>
          </div>
          <div className="text-center">
            <h3 className="font-semibold mb-2">
              Only {options.find(o => o.value === userB)?.label}
            </h3>
            <ul className="list-disc list-inside">
              {results.onlyB.length > 0 ? (
                results.onlyB.map(ent => <li key={ent.id}>{ent.name}</li>)
              ) : (
                <li>None</li>
              )}
            </ul>
          </div>
        </div>
      )}
    </form>
  )
}