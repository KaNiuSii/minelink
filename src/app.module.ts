import { Module } from '@nestjs/common';
import { LinkModule } from './link/link.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [LinkModule, ConfigModule.forRoot(), DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
