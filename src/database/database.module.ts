import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule], // Import ConfigModule here
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
