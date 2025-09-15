// prisma/seed.ts
import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker'

faker.seed(42)

const prisma = new PrismaClient()

const range = (n: number) => Array.from({ length: n }, (_, i) => i)
const pickSome = <T>(arr: T[], min: number, max: number) => {
  const howMany = faker.number.int({ min, max })
  return faker.helpers.arrayElements(arr, howMany)
}

async function main() {
  // Start clean (order matters due to relations)
  await prisma.role.deleteMany()
  await prisma.user.deleteMany()
  await prisma.manager.deleteMany()
  await prisma.entitlement.deleteMany()

  // Managers
  const managers = [
  { id: 111, firstName: "Steve", lastName: "Steinour" },
  { id: 222, firstName: "Kendall", lastName: "Kowalski" },
  { id: 333, firstName: "Geoff", lastName: "Preston" },
  { id: 444, firstName: "Navpreet", lastName: "Jatana" },
  { id: 555, firstName: "Ursula", lastName: "Cottone" }
  ]
  await prisma.manager.createMany({ data: managers })

  // Entitlements
  const entitlementCatalog = [
    { name: 'MultiFactorMagician', type: 'Cyber', level: 1 },
    { name: 'PhishingSlayer', type: 'Cyber', level: 2 },
    { name: 'FirewallWhisperer', type: 'Cyber', level: 4 },
    { name: 'Documentation Ninja', type: 'BSA', level: 1 },
    { name: 'Spreadsheet Sorcerer', type: 'BSA', level: 2 },
    { name: 'HumanAPI', type: 'BSA', level: 4 },
    { name: 'ChangeWarrior', type: 'IT', level: 2 },
    { name: 'MobileReleaseRangler', type: 'IT', level: 3 },
    { name: 'CaptainCoordinate', type: 'IT', level: 1 },
    { name: 'PushItRealGood', type: 'Dev', level: 2 },
    { name: 'CtrlAltDelete', type: 'Dev', level: 1 },
    { name: 'TheLastDebugger', type: 'Dev', level: 4 },
    { name: 'HumanPipeline', type: 'MLOps', level: 1 },
    { name: 'CloudCostDenier', type: 'MLOps', level: 2 },
    { name: 'DockerDabbler', type: 'MLOps', level: 3 },
  ]
  const entitlementsData = entitlementCatalog.map((e, i) => ({
    id: i + 1,
    name: e.name,
    type: e.type,
    level: e.level,
  }))
  await prisma.entitlement.createMany({ data: entitlementsData })

  // Roles (2–3 per manager)
  const roles = managers.flatMap((m) => {
    const count = faker.number.int({ min: 2, max: 3 })
    return range(count).map((i) => ({
      id: Number(`${m.id}${i + 1}`), // e.g., manager 2 -> role ids 21,22,...
      name: faker.helpers.arrayElement([
        'Engineer',
        'Analyst',
        'Product Manager',
        'SRE',
        'Data Scientist',
        'Designer',
      ]),
      managerId: m.id,
    }))
  })
  await prisma.role.createMany({ data: roles })

  // Users (some with a manager, some without)
  const users = range(12).map((i) => ({
    id: i + 1,
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    computerId: faker.number.int({ min: 100000, max: 999999 }),
    managerId: faker.datatype.boolean()
      ? faker.helpers.arrayElement(managers).id
      : null,
  }))
  await prisma.user.createMany({ data: users })

  // Role ⇄ Entitlements
  const entitlementIds = entitlementsData.map((e) => e.id)
  for (const r of roles) {
    const connectIds = pickSome(entitlementIds, 3, 6).map((id) => ({ id }))
    await prisma.role.update({
      where: { id: r.id },
      data: { entitlements: { connect: connectIds } },
    })
  }

  // User ⇄ Entitlements
  for (const u of users) {
    const connectIds = pickSome(entitlementIds, 1, 3).map((id) => ({ id }))
    await prisma.user.update({
      where: { id: u.id },
      data: { entitlements: { connect: connectIds } },
    })
  }

  const [mgrCount, roleCount, userCount, entCount] = await Promise.all([
    prisma.manager.count(),
    prisma.role.count(),
    prisma.user.count(),
    prisma.entitlement.count(),
  ])
  console.log(
    `✅ Seeded ${mgrCount} managers, ${roleCount} roles, ${userCount} users, ${entCount} entitlements`
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