import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateCityDto } from '../dto/create-city.dto';
import { UpdateCityDto } from '../dto/update-city.dto';
import { CityService } from '../service/city.service';

@ApiTags('City')
@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Post(':country_id')
  create(
    @Param('country_id') country_id: string,
    @Body() createCityDto: CreateCityDto,
  ) {
    createCityDto.country_id = country_id;
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
  update(
    @Param('country_id') country_id: string,
    @Param('id') id: string,
    @Body() updateCityDto: UpdateCityDto,
  ) {
    updateCityDto.country_id = country_id;
    return this.cityService.update(id, updateCityDto);
  }
}
