import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateCountryDto } from '../dto/create-country.dto';
import { UpdateCountryDto } from '../dto/update-country.dto';
import { CountryService } from '../service/country.service';

@ApiTags('Country')
@Controller('country')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Post()
  create(@Body() createCountryDto: CreateCountryDto) {
    return this.countryService.create(createCountryDto);
  }

  @Get('/filter')
  findAll(@Query('filter_value') filter_value: string) {
    return this.countryService.findAll(filter_value);
  }

  @Put()
  update(@Query('id') id: string, @Body() updateCountryDto: UpdateCountryDto) {
    return this.countryService.update(id, updateCountryDto);
  }

  @Get('/page')
  pagination(@Query('page') page: string, @Query('limit') limit: string) {
    const paginationDto: any = {};
    paginationDto.page = +page;
    paginationDto.limit = +limit;
    return this.countryService.pagination(paginationDto);
  }

  @Get('/readOne')
  findOne(@Query('id') id: string) {
    console.log(id);
    return this.countryService.getOne(id);
  }
}
