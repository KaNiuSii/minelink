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
import { CreateLinkDto } from './dto/create-link.dto';
import { GenerateUniqueNameUseCase } from '../link/generate-unique-name.use-case';

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
    if (links) return links;
    throw new BadRequestException();
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    const link = await this.databaseService.getLinkById(id);
    if (link) return link;
    throw new BadRequestException();
  }

  @Post('/create')
  async createLink(@Body() createLinkDto: CreateLinkDto) {
    //TODO: tutaj tworze obiekt
    await this.databaseService.insertLink({
      redirect: createLinkDto.redirect,
      customName:
        createLinkDto.customName ?? this.generateUniqueNameUseCase.call(),
    });
    //TODO: zwracaj customName
    return createLinkDto.customName;
  }
}
