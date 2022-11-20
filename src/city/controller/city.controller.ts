import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateCityDto } from '../dto/create-city.dto';
import { UpdateCityDto } from '../dto/update-city.dto';
import { CityService } from '../service/city.service';

@ApiTags('City')
@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Post()
  create(@Body() createCityDto: CreateCityDto) {
    return this.cityService.create(createCityDto);
  }

  @Get()
  findAll() {
    return this.cityService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cityService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCityDto: UpdateCityDto) {
    return this.cityService.update(id, updateCityDto);
  }
}
