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
    { id: 1,  name: 'MultiFactorMagician',   type: 'Cyber', level: 1, description: 'Grants and manages access to Microsoft Authenticator.' },
    { id: 2,  name: 'PhishingSlayer',        type: 'Cyber', level: 2, description: 'Grants access to email senders.' },
    { id: 3,  name: 'FirewallWhisperer',     type: 'Cyber', level: 4, description: 'Grants access to Palo Alto firewalls.' },
    { id: 4,  name: 'Documentation Ninja',   type: 'BSA',   level: 1, description: 'Grants access to SharePoint and Microsoft documentation.' },
    { id: 5,  name: 'Spreadsheet Sorcerer',  type: 'BSA',   level: 2, description: 'Grants access to Excel files with embedded data views.' },
    { id: 6,  name: 'HumanAPI',              type: 'BSA',   level: 4, description: 'Grants access to ServiceNow workflows.' },
    { id: 7,  name: 'ChangeWarrior',         type: 'IT',    level: 2, description: 'Grants access to ServiceNow change management with role-based visibility.' },
    { id: 8,  name: 'MobileReleaseRangler',  type: 'IT',    level: 3, description: 'Grants access to Flutter.' },
    { id: 9,  name: 'CaptainCoordinate',     type: 'IT',    level: 1, description: 'Grants access to team calendars and ADO boards.' },
    { id:10,  name: 'PushItRealGood',        type: 'Dev',   level: 2, description: 'Manages GitHub access and ADO.' },
    { id:11,  name: 'CtrlAltDelete',         type: 'Dev',   level: 1, description: 'Grants access to locked or degraded workflows in ServiceNow.' },
    { id:12,  name: 'TheLastDebugger',       type: 'Dev',   level: 4, description: 'Grants access to Splunk logs, etc.' },
    { id:13,  name: 'HumanPipeline',         type: 'MLOps', level: 1, description: 'Grants access to onboarding, offboarding, and role changes in ServiceNow HR Service Delivery.' },
    { id:14,  name: 'CloudCostDenier',       type: 'MLOps', level: 2, description: 'Grants access to AWS and Azure by enforcing policies through ServiceNow Cloud Insights.' },
    { id:15,  name: 'DockerDabbler',         type: 'MLOps', level: 3, description: 'Grants access to Docker containers via AWS ECR for testing and development work.' },
  ];
  await prisma.entitlement.createMany({ data: entitlements })

  // Teams — deterministic
  const teams = [
    // Steve (111)
    { id: 10, name: 'CyberTeam',     managerId: 111 },
    { id: 11, name: 'ThreatOps',     managerId: 111 },
    // Kendall (222)
    { id: 12, name: 'Elevates',      managerId: 222 },
    // Ursula (555)
    { id: 20, name: 'DataScientists',   managerId: 555 },
    { id: 21, name: 'MLOps',            managerId: 555 },
    { id: 22, name: 'Elevates',         managerId: 555 },
    // Geoff (333)
    { id: 30, name: 'SeniorDevelopers',     managerId: 333 },
    { id: 31, name: 'QualityAssurance',     managerId: 333 },
    { id: 32, name: 'Elevates',             managerId: 333 },
    // Navpreet (444)
    { id: 40, name: 'MobileEngineering', managerId: 444 },
    { id: 41, name: 'PlatformEngineers', managerId: 444 },
    { id: 42, name: 'Elevates',          managerId: 444 },
    // Kendall (222)
    { id: 50, name: 'RiskTeam',         managerId: 222 },
    { id: 51, name: 'ComplianceTeam',   managerId: 222 },
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
    { id: 17, firstName: 'Elizabeth', lastName: 'Feinler',   computerId: 10017, managerId: 555 },
  ]
  await prisma.user.createMany({ data: users })

  // === ASSIGNMENTS (deterministic, no randomness) ===
  const teamsList = await prisma.team.findMany({ orderBy: { id: 'asc' } })
  const entList   = await prisma.entitlement.findMany({ orderBy: { id: 'asc' } })
  const usersList = await prisma.user.findMany({ orderBy: { id: 'asc' } })

  // Define exactly which entitlements each team should get
  const teamEntitlementMap: Record<number, number[]> = {
    10: [1, 2, 3],
    11: [3, 6, 12],
    12: [1, 4, 11],
    20: [5, 13, 14],
    21: [13, 14, 15],
    22: [1, 4, 11],
    30: [10, 11, 12],
    31: [4, 10, 12],
    32: [1, 4, 11],
    40: [7, 8, 9],
    41: [10, 11, 13],
    42: [1, 4, 11],
    50: [1, 2, 3],
    51: [4, 5, 13],
  }

  // Apply the team→entitlements mapping
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

  // --- USERS → TEAMS: per-manager round-robin that covers all teams ---
  // Build helpers
  const teamsByManager = teamsList.reduce<Record<number, { id: number }[]>>((acc, t) => {
    (acc[t.managerId] ||= []).push({ id: t.id })
    return acc
  }, {})

  const usersByManager = usersList.reduce<Record<number, typeof usersList>>((acc, u) => {
    if (u.managerId == null) return acc
    ;(acc[u.managerId] ||= []).push(u)
    return acc
  }, {})

  // For each manager, 1) cover every team with a primary user, 2) give users a second team if possible
  for (const [mgrIdStr, mgrUsersRaw] of Object.entries(usersByManager)) {
    const mgrId = Number(mgrIdStr)
    const mgrTeams = (teamsByManager[mgrId] || []).sort((a, b) => a.id - b.id)
    const mgrUsers = [...mgrUsersRaw].sort((a, b) => a.id - b.id)
    if (mgrTeams.length === 0 || mgrUsers.length === 0) continue

    // Build a connection plan: userId -> Set<teamId>
    const plan: Record<number, Set<number>> = {}
    const add = (userId: number, teamId: number) => {
      (plan[userId] ||= new Set()).add(teamId)
    }

    // Pass 1: ensure EVERY TEAM has at least one user (round-robin over users)
    for (let i = 0; i < mgrTeams.length; i++) {
      const team = mgrTeams[i]
      const user = mgrUsers[i % mgrUsers.length]
      add(user.id, team.id)
    }

    // Pass 2: give each user a second team (if more than one team exists)
    if (mgrTeams.length > 1) {
      for (let j = 0; j < mgrUsers.length; j++) {
        const u = mgrUsers[j]
        const primaryIdx = j % mgrTeams.length
        const secondaryIdx = (primaryIdx + 1) % mgrTeams.length
        add(u.id, mgrTeams[secondaryIdx].id)
      }
    }

    // Apply connections + deterministic 2 entitlements per user
    for (const u of mgrUsers) {
      const teamIds = Array.from(plan[u.id] || [])
      const userEnts = circularPick(entList, u.id * 1, 1).map(e => ({ id: e.id }))

      await prisma.user.update({
        where: { id: u.id },
        data: {
          teams: { set: [], connect: teamIds.map(id => ({ id })) },
          entitlements: { set: [], connect: userEnts },
        },
      })
    }
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
