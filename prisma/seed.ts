// prisma/seed.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Helper: circular picker to deterministically take n items from an array starting at offset
function circularPick<T>(arr: T[], start: number, n: number): T[] {
  const out: T[] = []
  for (let k = 0; k < n; k++) {
    out.push(arr[(start + k) % arr.length])
  }
  return out
}

async function main() {
  // Clean slate (order matters due to FKs)
  await prisma.team.deleteMany()
  await prisma.user.deleteMany()
  await prisma.manager.deleteMany()
  await prisma.entitlement.deleteMany()

  // Managers
  const managers = [
    { id: 111, firstName: 'Steve',    lastName: 'Steinour' },
    { id: 222, firstName: 'Kendall',  lastName: 'Kowalski' },
    { id: 333, firstName: 'Geoff',    lastName: 'Preston' },
    { id: 444, firstName: 'Navpreet', lastName: 'Jatana' },
    { id: 555, firstName: 'Ursula',   lastName: 'Cottone' },
  ]
  await prisma.manager.createMany({ data: managers })

  // Entitlements
  const entitlements = [
    { id: 1,  name: 'MultiFactorMagician',   type: 'Cyber', level: 1 },
    { id: 2,  name: 'PhishingSlayer',        type: 'Cyber', level: 2 },
    { id: 3,  name: 'FirewallWhisperer',     type: 'Cyber', level: 4 },
    { id: 4,  name: 'Documentation Ninja',   type: 'BSA',   level: 1 },
    { id: 5,  name: 'Spreadsheet Sorcerer',  type: 'BSA',   level: 2 },
    { id: 6,  name: 'HumanAPI',              type: 'BSA',   level: 4 },
    { id: 7,  name: 'ChangeWarrior',         type: 'IT',    level: 2 },
    { id: 8,  name: 'MobileReleaseRangler',  type: 'IT',    level: 3 },
    { id: 9,  name: 'CaptainCoordinate',     type: 'IT',    level: 1 },
    { id:10,  name: 'PushItRealGood',        type: 'Dev',   level: 2 },
    { id:11,  name: 'CtrlAltDelete',         type: 'Dev',   level: 1 },
    { id:12,  name: 'TheLastDebugger',       type: 'Dev',   level: 4 },
    { id:13,  name: 'HumanPipeline',         type: 'MLOps', level: 1 },
    { id:14,  name: 'CloudCostDenier',       type: 'MLOps', level: 2 },
    { id:15,  name: 'DockerDabbler',         type: 'MLOps', level: 3 },
  ]
  await prisma.entitlement.createMany({ data: entitlements })

  // Teams — 2 per manager (deterministic)
  const teams = [
    // Steve (111)
    { id: 10, name: 'CyberTeam',     managerId: 111 },
    { id: 11, name: 'ThreatOps',     managerId: 111 },
    { id: 12, name: 'Elevates',      managerId: 222 },
    // Ursula (555)
    { id: 20, name: 'DataScientists',   managerId: 555 },
    { id: 21, name: 'MLOps',            managerId: 555 },
    { id: 22, name: 'Elevates',         managerId: 555 },
    // Geoff (333)
    { id: 30, name: 'SeniorDevelopers',       managerId: 333 },
    { id: 31, name: 'QualityAssurance',  managerId: 333 },
    { id: 32, name: 'Elevates',          managerId: 333 },
    // Navpreet (444)
    { id: 40, name: 'MobileEngineering', managerId: 444 },
    { id: 41, name: 'PlatformEngineers', managerId: 444 },
    { id: 42, name: 'Elevates',          managerId: 444 },
    // Kendall (222)
    { id: 50, name: 'RiskTeam',              managerId: 222 },
    { id: 51, name: 'ComplianceTeam',        managerId: 222 },
    { id: 52, name: 'Auditors',              managerId: 222 }
  ]
  await prisma.team.createMany({ data: teams })

  // Users
  const users = [
    { id: 1,  firstName: 'Bon',       lastName: 'Jovi',      computerId: 10001, managerId: 111 },
    { id: 2,  firstName: 'Susan B.',  lastName: 'Anthony',   computerId: 10002, managerId: 111 },
    { id: 3,  firstName: 'Michael',   lastName: 'Jackson',   computerId: 10003, managerId: 111 },
    { id: 4,  firstName: 'Maya',      lastName: 'Angelou',   computerId: 10004, managerId: 111 },

    { id: 5,  firstName: 'Brad',      lastName: 'Pitt',      computerId: 10005, managerId: 222 },
    { id: 6,  firstName: 'Simone',    lastName: 'Biles',     computerId: 10006, managerId: 222 },
    { id: 7,  firstName: 'Kobe',      lastName: 'Bryant',    computerId: 10007, managerId: 222 },

    { id: 8,  firstName: 'Amelia',    lastName: 'Airhart',   computerId: 10008, managerId: 444 },
    { id: 9,  firstName: 'Jane',      lastName: 'Austen',    computerId: 10009, managerId: 444 },
    { id: 10, firstName: 'Harry',     lastName: 'Styles',    computerId: 10010, managerId: 444 },

    { id: 11, firstName: 'Taylor',    lastName: 'Swift',     computerId: 10011, managerId: 333 },
    { id: 12, firstName: 'Serena',    lastName: 'Williams',  computerId: 10012, managerId: 333 },
    { id: 13, firstName: 'Steph',     lastName: 'Curry',     computerId: 10013, managerId: 333 },

    { id: 14, firstName: 'Cathleen',  lastName: 'Booth',     computerId: 10014, managerId: 555 },
    { id: 15, firstName: 'Mary',      lastName: 'Jackson',   computerId: 10015, managerId: 555 },
    { id: 16, firstName: 'Ada',       lastName: 'Lovelace',  computerId: 10016, managerId: 555 },

    { id: 17, firstName: 'Elizabeth', lastName: 'Feinler',   computerId: 10017, managerId: 111 },
  ]
  await prisma.user.createMany({ data: users })

  // === ASSIGNMENTS (deterministic, no randomness) ===
  const teamsList = await prisma.team.findMany({ orderBy: { id: 'asc' } })
  const entList   = await prisma.entitlement.findMany({ orderBy: { id: 'asc' } })
  const usersList = await prisma.user.findMany({ orderBy: { id: 'asc' } })

  // Define exactly which entitlements each team should get
  const teamEntitlementMap: Record<number, number[]> = {
    10: [1, 2, 3],   // CyberTeam gets MFA, Phishing, Firewall
    11: [4, 5],      // ThreatOps gets Documentation, Spreadsheet
    12: [6, 7, 8],   // Elevate (Kendall) gets HumanAPI, ChangeWarrior, MobileRelease
    20: [9, 10, 11], // DataScientists gets Captain, PushIt, CtrlAlt
    21: [12, 13],    // MLOps gets TheLastDebugger, HumanPipeline
    // ... add entries for every team ID you want
  }

  // Apply the mapping
  for (const [teamId, entIds] of Object.entries(teamEntitlementMap)) {
    await prisma.team.update({
      where: { id: Number(teamId) },
      data: {
        entitlements: {
          set: [],
          connect: entIds.map(id => ({ id })),
        },
      },
    })
  }

  // Group teams by manager
  const teamsByManager = teamsList.reduce<Record<number, { id: number }[]>>((acc, t) => {
    acc[t.managerId] ||= []
    acc[t.managerId].push({ id: t.id })
    return acc
  }, {})

  // 2) For each user: connect to 1–2 teams under THEIR manager (deterministic)
  //    and give EXACTLY 2 entitlements (circular)
  for (let i = 0; i < usersList.length; i++) {
    const u = usersList[i]
    const managerTeams = teamsByManager[u.managerId ?? -1] ?? []

    // Deterministic team selection:
    // - Always connect to the first team for that manager
    // - If there is a second team, connect to it for even-indexed users
    const toConnect: { id: number }[] = []
    if (managerTeams.length >= 1) toConnect.push(managerTeams[0])
    if (managerTeams.length >= 2 && i % 2 === 0) toConnect.push(managerTeams[1])

    const userEnts = circularPick(entList, i * 2, 2).map(e => ({ id: e.id }))

    await prisma.user.update({
      where: { id: u.id },
      data: {
        teams: {
          set: [],
          connect: toConnect,
        },
        entitlements: {
          set: [],
          connect: userEnts,
        },
      },
    })
  }

  console.log('Seeding complete ✓')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
