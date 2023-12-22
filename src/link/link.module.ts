import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LinkController } from './controller/link/link.controller';
import { DatabaseService } from './database/database.service';

@Module({
  imports: [ConfigModule],
  controllers: [LinkController],
  providers: [DatabaseService],
})
export class LinkModule {}
