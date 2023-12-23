import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateLinkDto } from './create-link.dto';
import * as crypto from 'crypto';

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
  @Post('/create')
  async createLink(@Body() createLinkDto: CreateLinkDto) {
    if (!createLinkDto.customName) {
      createLinkDto.customName = this.generateUniqueName();
    }
    const link = await this.databaseService.createLink({
      customName: createLinkDto.customName,
      redirect: createLinkDto.redirect,
    });
    if (link) return link;
    throw new BadRequestException('Failed to create the link');
  }
  private generateUniqueName(): string {
    const currentDateTime = new Date().toISOString();
    const randomPart = crypto.randomBytes(8).toString('hex');
    const hash = crypto.createHash('sha256');
    hash.update(currentDateTime + randomPart);
    return hash.digest('hex');
  }
}
