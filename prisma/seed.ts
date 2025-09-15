// prisma/seed.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Start clean (order matters due to relations)
  await prisma.team.deleteMany()
  await prisma.user.deleteMany()
  await prisma.manager.deleteMany()
  await prisma.entitlement.deleteMany()

  // Managers
  const managers = [
    { id: 111, firstName: "Steve", lastName: "Steinour" },
    { id: 222, firstName: "Kendall", lastName: "Kowalski" },
  ]
  await prisma.manager.createMany({ data: managers })

  // Entitlements
  const entitlements = [
    { id: 1, name: 'MultiFactorMagician', type: 'Cyber', level: 1 },
    { id: 2, name: 'PhishingSlayer', type: 'Cyber', level: 2 },
    { id: 3, name: 'CloudCostDenier', type: 'MLOps', level: 2 },
  ]
  await prisma.entitlement.createMany({ data: entitlements })

  // Teams
  const teams = [
    { id: 10, name: "CyberSecurity", managerId: 111 },
    { id: 20, name: "CloudOps", managerId: 222 },
  ]
  await prisma.team.createMany({ data: teams })

  // Users
  const users = [
    { id: 1, firstName: "Alice", lastName: "Anderson", computerId: 100001, managerId: 111 },
    { id: 2, firstName: "Bob", lastName: "Brown", computerId: 100002, managerId: 222 },
    { id: 3, firstName: "Charlie", lastName: "Clark", computerId: 100003, managerId: null }, // no manager
  ]
  await prisma.user.createMany({ data: users })

  // User ⇄ Teams
  await prisma.user.update({
    where: { id: 1 },
    data: { teams: { connect: [{ id: 10 }] } }, // Alice → CyberSecurity
  })
  await prisma.user.update({
    where: { id: 2 },
    data: { teams: { connect: [{ id: 20 }] } }, // Bob → CloudOps
  })
  await prisma.user.update({
    where: { id: 3 },
    data: { teams: { connect: [{ id: 10 }, { id: 20 }] } }, // Charlie → both teams
  })

  // User ⇄ Entitlements
  await prisma.user.update({
    where: { id: 1 },
    data: { entitlements: { connect: [{ id: 1 }, { id: 2 }] } }, // Alice
  })
  await prisma.user.update({
    where: { id: 2 },
    data: { entitlements: { connect: [{ id: 3 }] } }, // Bob
  })

  // Team ⇄ Entitlements
  await prisma.team.update({
    where: { id: 10 },
    data: { entitlements: { connect: [{ id: 1 }] } }, // CyberSecurity
  })
  await prisma.team.update({
    where: { id: 20 },
    data: { entitlements: { connect: [{ id: 3 }] } }, // CloudOps
  })

  const [mgrCount, teamCount, userCount, entCount] = await Promise.all([
    prisma.manager.count(),
    prisma.team.count(),
    prisma.user.count(),
    prisma.entitlement.count(),
  ])
  console.log(
    `✅ Seeded ${mgrCount} managers, ${teamCount} teams, ${userCount} users, ${entCount} entitlements`
  )
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
