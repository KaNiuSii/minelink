import { Module } from '@nestjs/common';
import { LinkModule } from './link/link.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseService } from './link/database/database.service';

@Module({
  imports: [LinkModule, ConfigModule.forRoot()],
  controllers: [],
  providers: [DatabaseService],
})
export class AppModule {}
