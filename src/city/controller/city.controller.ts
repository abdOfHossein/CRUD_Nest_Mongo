import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateCityDto } from '../dto/create-city.dto';
import { PaginationCityDto } from '../dto/pagination.dto';
import { UpdateCityDto } from '../dto/update-city.dto';
import { CityService } from '../service/city.service';

@ApiTags('City')
@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}
  private paginationCityDto: PaginationCityDto;

  @Post(':country_id')
  create(
    @Param('country_id') country_id: string,
    @Body() createCityDto: CreateCityDto,
  ) {
    createCityDto.country_id = country_id;
    return this.cityService.create(createCityDto);
  }

  @Get(':filter_value')
  findAll(@Param('filter_value') filter_value: string) {
    return this.cityService.findAll(filter_value);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cityService.findOne(id);
  }

  @Put('/:id/:country_id')
  update(
    @Param('country_id') country_id: string,
    @Param('id') id: string,
    @Body() updateCityDto: UpdateCityDto,
  ) {
    updateCityDto.country_id = country_id;
    return this.cityService.update(id, updateCityDto);
  }

  @Get(':page/:limit')
  pagination(@Param('page') page: string, @Param('limit') limit: string) {
    const paginationDto: any = {};
    paginationDto.page = +page;
    paginationDto.limit = +limit;
    return this.cityService.pagination(paginationDto);
  }
}
