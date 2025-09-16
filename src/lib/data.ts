import {prisma} from './prisma';
import type { Manager } from '@prisma/client';
import type {Team} from '@prisma/client';
import type {User} from '@prisma/client';
import type { Entitlement } from '@prisma/client';

const itemsPerPage = 10;
export async function getManagers(query: string, page: number) {
    const offset = (page - 1) * itemsPerPage;
    try{
        const managers: Manager[] = await prisma.$queryRaw<Manager[]>`
        SELECT 
            id,
            firstName,
            lastName,
            teams,
            users
        FROM Manager
        ORDER BY createdAt DESC
        LIMIT ${itemsPerPage} OFFSET ${offset};
        `;
        return managers;
    } catch (error) {
        console.error("Error fetching managers:", error);
        throw new Error("Could not fetch managers");
    }
}

export async function getTeams(query: string, page: number) {
    const offset = (page - 1) * itemsPerPage;
    try{
        const teams: Team[] = await prisma.$queryRaw<Team[]>`
        SELECT
            id,
            name,
            managerId,
            manager,
            entitlements,
            users
        FROM Team
        ORDER BY createdAt DESC
        LIMIT ${itemsPerPage} OFFSET ${offset};
        `;
        return teams;
    } catch (error) {
        console.error("Error fetching teams:", error);
        throw new Error("Could not fetch teams");
    }   
}

export async function getUsers(query: string, page: number) {   
    const offset = (page - 1) * itemsPerPage;
    try{
        const users: User[] = await prisma.$queryRaw<User[]>`
        SELECT
            id,
            firstName,
            lastName,
            computerID,
            managerID,
            manager,
            entitlements,
            teams
        FROM User
        ORDER BY createdAt DESC
        LIMIT ${itemsPerPage} OFFSET ${offset};
        `;
        return users;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw new Error("Could not fetch users");
    }   
}

export async function getEntitlements(query: string, page: number) {
    const offset = (page - 1) * itemsPerPage;
    try{
        const entitlements: Entitlement[] = await prisma.$queryRaw<Entitlement[]>`
        SELECT
            id,
            name,
            type,
            level,
            description,
            teams,
            users
        FROM Entitlement
        ORDER BY createdAt DESC
        LIMIT ${itemsPerPage} OFFSET ${offset};
        `;
        return entitlements;
    } catch (error) {
        console.error("Error fetching entitlements:", error);
        throw new Error("Could not fetch entitlements");
    }
}

export async function getTotalCount(model: 'Manager' | 'Team' | 'User' | 'Entitlement') {
    try{
        const countResult = await prisma.$queryRaw<{ count: number }[]>`
        SELECT COUNT(*) as count 
        FROM Manager, Team, User, Entitlement
        `;
        const count = countResult[0]?.count ?? 0;
        const totalCount = Math.ceil(Number(count) / itemsPerPage);
        return totalCount;
    } catch (error) {
        console.error("Error fetching total count:", error);
        throw new Error("Could not fetch total count");
    }
}

export async function getAllManagers() {
    try{
        const managers: Manager[] = await prisma.manager.findMany();
        return managers;
    } catch (error) {
        console.error("Error fetching all managers:", error);
        throw new Error("Could not fetch all managers");
    }
}
export async function getAllEntitlements() {
    try{
        const entitlements: Entitlement[] = await prisma.entitlement.findMany();
        return entitlements;
    } catch (error) {
        console.error("Error fetching all entitlements:", error);
        throw new Error("Could not fetch all entitlements");
    }
}

export async function getAllTeams() {
    try{
        const teams: Team[] = await prisma.team.findMany();
        return teams;
    } catch (error) {
        console.error("Error fetching all teams:", error);
        throw new Error("Could not fetch all teams");
    }
}

export async function getAllUsers() {
    try{
        const users: User[] = await prisma.user.findMany();
        return users;
    } catch (error) {
        console.error("Error fetching all users:", error);
        throw new Error("Could not fetch all users");
    }
}

export async function getEntitlementsByUsers(users: User[]) {
    try{
        const entitlements =  await prisma.$queryRaw<Entitlement[]>`
        SELECT
            e.id,
            e.name,
            e.type,
            e.level,
            e.description,
            e.teams,
            e.users
        FROM Entitlement e
        JOIN _UserToEntitlement ue ON e.id = ue.A
        WHERE ue.B IN (${users.map(user => user.id)});
        `;
        return entitlements;
    } catch (error) {
        console.error("Error fetching entitlements by users:", error);
        throw new Error("Could not fetch entitlements by users");
    }
}



            

