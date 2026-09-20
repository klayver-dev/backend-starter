import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { databaseUrl } from '../config.js';
import { PrismaClient } from '../generated/prisma/client.js';

const adapter = new PrismaBetterSqlite3({
  url: databaseUrl,
});

const prisma = new PrismaClient({
  adapter,
});

export { prisma };
