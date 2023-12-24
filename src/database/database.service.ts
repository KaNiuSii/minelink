import { Inject, Injectable } from '@nestjs/common';
import { Client } from 'pg';
import { ConfigService } from '@nestjs/config';

export const LinkTableName = 'link';

interface LinkRecord {
  id: string;
  link: string;
  redirect: string;
}

const mapRecordToLinkReadModel = (record: LinkRecord): LinkReadModel => {
  return {
    id: record.id,
    link: record.link,
    redirect: record.redirect,
  };
};

@Injectable()
export class DatabaseService {
  private client: Client; // kisely, knex

  constructor(@Inject(ConfigService) private configService: ConfigService) {
    this.client = new Client({
      host: this.configService.get<string>('DATABASE_HOST'), // pobieranie envów przez process.env.
      user: this.configService.get<string>('DATABASE_USER'),
      password: this.configService.get<string>('DATABASE_PASSWORD'),
      database: this.configService.get<string>('DATABASE_NAME'),
      port: this.configService.get<number>('DATABASE_PORT'),
    });

    this.client.connect();
  }

  async getAllLinks(): Promise<any[]> {
    try {
      const result = await this.client.query('SELECT * FROM link');
      return result.rows;
    } catch (error) {
      throw new Error('Error fetching links: ' + error.message);
    }
  }

  async getLinkById(id: number): Promise<LinkReadModel | undefined> {
    // await this.client.table(LinkTableName).select('*').where('id', id).first();
    const result = await this.client.query('SELECT * FROM link WHERE id = $1', [
      id,
    ]);
    return result ? mapRecordToLinkReadModel(result) : undefined;
  }

  async insertLink(customName: string, redirect: string): Promise<void> {
    await this.client.query(
      'INSERT INTO link(name, redirect) VALUES ($1, $2)',
      [customName, redirect],
    );
  }
}
