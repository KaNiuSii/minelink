import {
  BadRequestException,
  Controller,
  Get,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Controller('link')
export class LinkController {
  constructor(private databaseService: DatabaseService) {}

  @Get('')
  async getAll() {
    const links = await this.databaseService.getAllLinks();
    if (links) return links;
    throw new BadRequestException();
  }
  @Get(':id')
  async getAtId(@Param('id', ParseIntPipe) id: number) {
    const link = await this.databaseService.getLinkById(id);
    if (link) return link;
    throw new BadRequestException();
  }
}
