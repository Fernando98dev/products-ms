import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('PrismaService');

  constructor() {
    const rawUrl = process.env.DATABASE_URL;

    if (!rawUrl) {
      throw new Error('DATABASE_URL is not defined');
    }

    const dbCleanPath = rawUrl.replace('file:', '').replace(/["']/g, '');

    const dbPath = path.isAbsolute(dbCleanPath)
      ? dbCleanPath
      : path.resolve(process.cwd(), dbCleanPath);

    const dir = path.dirname(dbPath);

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const adapter = new PrismaBetterSqlite3({
      url: rawUrl,
    });

    super({ adapter });

    this.logger.log(`Database configured at ${dbPath}`);
  }

  async onModuleInit() {
    await this.$connect();
  }
}