import { Module } from '@nestjs/common';
import { LinkModule } from './link/link.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [ConfigModule.forRoot(), LinkModule, DatabaseModule], //TODO: check if DatabaseModule is needed here
  controllers: [], //TODO: remove, redundant
  providers: [], //TODO: remove, redundant
})
export class AppModule {}
