import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LinkController } from '../http-api/link.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [ConfigModule, DatabaseModule],
  controllers: [LinkController],
})
export class LinkModule {}
