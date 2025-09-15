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
  const managers = range(3).map((i) => ({
    id: i + 1, // manual ids because schema uses Int @id (no autoincrement)
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
  }))
  await prisma.manager.createMany({ data: managers })

  // Entitlements
  const entitlementCatalog = [
    { name: 'GitHub: Repo Read', type: 'dev', level: 1 },
    { name: 'GitHub: Repo Write', type: 'dev', level: 2 },
    { name: 'GitHub: Org Admin', type: 'dev', level: 4 },
    { name: 'Jira: Browse Projects', type: 'pm', level: 1 },
    { name: 'Jira: Create Issues', type: 'pm', level: 2 },
    { name: 'Jira: Project Admin', type: 'pm', level: 4 },
    { name: 'Prod DB: Read', type: 'data', level: 2 },
    { name: 'Prod DB: Write', type: 'data', level: 3 },
    { name: 'S3 Bucket: Read', type: 'cloud', level: 1 },
    { name: 'S3 Bucket: Write', type: 'cloud', level: 2 },
    { name: 'IAM: ViewOnly', type: 'cloud', level: 1 },
    { name: 'IAM: PowerUser', type: 'cloud', level: 4 },
    { name: 'Snowflake: Reader', type: 'data', level: 1 },
    { name: 'Snowflake: Writer', type: 'data', level: 2 },
    { name: 'Kubernetes: Namespace Admin', type: 'platform', level: 3 },
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