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
    if (!links) { //TODO: proposition, not needed to change
      throw new BadRequestException();
    }
    return links;
  }

  @Get('id/:id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    const link = await this.databaseService.getLinkById(id);
    if (!link) throw new BadRequestException();
    return link;
  }

  @Get('name/:name')
  async getNameByName(@Param('name') name: string) { //TODO: getNameByName ???????????????????????? WYJEBAC
    const link = await this.databaseService.getLinkByName(name);
    if (!link) throw new BadRequestException();
    return JSON.stringify(link.name); //TODO: return string like in createLink by {}
  }

  @Get('redirect/:name')
  async getRedirectByName(@Param('name') name: string) {
    const link = await this.databaseService.getLinkByName(name);
    if (!link) throw new BadRequestException();
    return JSON.stringify(link.redirect); //TODO: return string like in createLink by {}
  }

  @Post('/create')
  async createLink(@Body() createLinkDto: CreateLinkDto) {

    if (createLinkDto.name) {
      const link = await this.databaseService.getLinkByName(createLinkDto.name);
      if (!link) throw new BadRequestException();
    }

        //TODO: DON'T MODIFY DTO!!! CREATE NEW OBJ
    // const dupa = {
    //   ...createLinkDto,
    //   name: createLinkDto.name ?? this.generateUniqueNameUseCase.call(),
    // };

    createLinkDto.name =
      createLinkDto.name ?? this.generateUniqueNameUseCase.call();
    await this.databaseService.insertLink(
      createLinkDto.name,
      createLinkDto.redirect,
    );
    return { //TODO: do it like that
      name: createLinkDto.name,
    };
    // return JSON.stringify(createLinkDto.name);
  }
}
