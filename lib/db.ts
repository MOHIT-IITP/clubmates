import { PrismaClient } from "./generated/prisma/client";

declare global {
  // allow global `prisma` in dev to avoid multiple instances
  var prisma: PrismaClient | undefined;
}

export const prisma = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;
