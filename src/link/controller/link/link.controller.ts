import { BadRequestException, Controller, Get } from '@nestjs/common';
import { DatabaseService } from 'src/link/database/database.service';

@Controller('link')
export class LinkController {
  constructor(private databaseService: DatabaseService) {}

  @Get('')
  async getAllLinks() {
    const links = await this.databaseService.getAllLinks();
    if (links) return links;
    throw new BadRequestException();
  }
}
