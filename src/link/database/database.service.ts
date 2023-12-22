import { Injectable } from '@nestjs/common';
import { Client } from 'pg';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DatabaseService {
  private client: Client;

  constructor(private configService: ConfigService) {
    this.client = new Client({
      host: this.configService.get<string>('DATABASE_HOST'),
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
}
