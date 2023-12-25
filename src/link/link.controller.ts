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
    if (!links) throw new BadRequestException();
    return links;
  }
  @Get('id/:id')
  async getAtId(@Param('id', ParseIntPipe) id: number) {
    const link = await this.databaseService.getLinkById(id);
    if (!link) throw new BadRequestException();
    return link;
  }
  @Get('redirect/:name')
  async getAtName(@Param('name') name: string) {
    const link = await this.databaseService.getLinkByName(name);
    if (!link) throw new BadRequestException();
    return link.redirect;
  }
  @Post('/create')
  async createLink(@Body() createLinkDto: CreateLinkDto) {
    const customName =
      createLinkDto.customName ?? this.generateUniqueNameUseCase.call();
    await this.databaseService.insertLink(customName, createLinkDto.redirect);
    return customName;
  }
}
