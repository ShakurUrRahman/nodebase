// lib/db.ts
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
	prisma: PrismaClient | undefined;
};

export const prisma =
	globalForPrisma.prisma ??
	new PrismaClient({
		datasources: {
			db: {
				url: process.env.DATABASE_URL,
			},
		},
		// ✅ Retry on connection failure (handles Neon cold starts)
		log: ["error"],
	});

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
