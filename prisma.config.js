const path = require("path");
const fs = require("fs");
require("dotenv").config();

// En Docker, el directorio de trabajo es /usr/src/app
// La base de datos está en /usr/src/app/prisma/dev.db
const dbPath = path.resolve(__dirname, 'prisma', 'dev.db');

console.log(`[PrismaConfig] Resolving database path...`);
console.log(`[PrismaConfig] __dirname: ${__dirname}`);
console.log(`[PrismaConfig] Target Path: ${dbPath}`);

if (fs.existsSync(dbPath)) {
  console.log(`[PrismaConfig] Database file found.`);
} else {
  console.error(`[PrismaConfig] WARNING: Database file NOT found at ${dbPath}`);
}

module.exports = {
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: `file:${dbPath}`,
  },
};
