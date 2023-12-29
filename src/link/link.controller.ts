import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateLinkDto } from './create-link.dto';
import { GenerateUniqueNameUseCase } from './generate-unique-name.use-case';
import { log } from 'console';

@Controller('link')
export class LinkController {
  constructor(
    @Inject(DatabaseService)
    private readonly databaseService: DatabaseService,
    @Inject(GenerateUniqueNameUseCase)
    private readonly generateUniqueNameUseCase: GenerateUniqueNameUseCase,
  ) {}

  @Get('')
  async getAll() {
    const links = await this.databaseService.getAllLinks();
    if (!links) {
      throw new BadRequestException();
    }
    return links;
  }
  @Get('id/:id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    const link = await this.databaseService.getLinkById(id);
    if (!link) {
      throw new BadRequestException();
    }
    return link;
  }
  @Get('redirect/:name')
  async getRedirectByName(@Param('name') name: string) {
    const link = await this.databaseService.getLinkByName(name);
    if (!link) {
      throw new BadRequestException();
    }
    return { redirect: link.redirect };
  }
  @Post('/create')
  async createLink(@Body() createLinkDto: CreateLinkDto) {
    console.log(createLinkDto);
    const name =
      createLinkDto.name && createLinkDto.name !== ''
        ? createLinkDto.name
        : this.generateUniqueNameUseCase.call();
    console.log(name);
    const link = await this.databaseService.getLinkByName(name);
    console.log(link);
    if (link) {
      throw new BadRequestException();
    }
    await this.databaseService.insertLink(name, createLinkDto.redirect);
    return { name: name };
  }
}
