import { Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import { Kysely, PostgresDialect } from 'kysely';

export interface Link {
  id: number;
  name: string;
  redirect: string;
}

interface Database {
  link: Link;
}

@Injectable()
export class DatabaseService {
  private db: Kysely<Database>;

  constructor() {
    this.db = new Kysely<Database>({
      dialect: new PostgresDialect({
        pool: new Pool({
          host: process.env.DATABASE_HOST,
          user: process.env.DATABASE_USER,
          password: process.env.DATABASE_PASSWORD,
          database: process.env.DATABASE_NAME,
          port: parseInt(process.env.DATABASE_PORT, 10),
        }),
      }),
    });
  }

  async getAllLinks(): Promise<Link[]> {
    return this.db.selectFrom('link').selectAll().execute();
  }

  async getLinkById(id: number): Promise<Link | undefined> {
    return this.db
      .selectFrom('link')
      .selectAll()
      .where('id', '=', id)
      .executeTakeFirst();
  }

  async insertLink(name: string, redirect: string): Promise<void> {
    this.db
      .insertInto('link')
      .values({ name, redirect })
      .returningAll()
      .executeTakeFirstOrThrow();
  }
}
