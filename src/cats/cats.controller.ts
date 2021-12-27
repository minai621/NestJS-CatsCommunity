import { Controller, Delete, Get, Patch, Post, Put } from '@nestjs/common';
import { CatsService } from './cats.service';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  getAllCat() {}

  @Get(':id')
  getOneCat() {}

  @Post()
  createCat() {}

  @Put(':id')
  updateCat() {}

  @Patch(':id')
  updatePartialCat() {}

  @Delete('/')
  deleteCat() {}
}
