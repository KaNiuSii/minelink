import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LinkController } from './link.controller';
import { DatabaseModule } from 'src/database/database.module';
import { GenerateUniqueNameUseCase } from './generate-unique-name.use-case';

@Module({
  imports: [ConfigModule, DatabaseModule],
  controllers: [LinkController],
  providers: [GenerateUniqueNameUseCase],
})
export class LinkModule {}
