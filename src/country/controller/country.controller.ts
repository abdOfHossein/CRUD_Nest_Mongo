import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
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

  @Get(':filter_value')
  findAll(@Param('filter_value') filter_value: string) {
    return this.countryService.findAll(filter_value);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.countryService.findOne(id);
  }

  @Put('/:id/:city_id')
  update(
    @Param('id') id: string,
    @Param('city_id') city_id: string,
    @Body() updateCountryDto: UpdateCountryDto,
  ) {
    updateCountryDto.city_id = city_id;
    return this.countryService.update(id, updateCountryDto);
  }

  @Get(':page/:limit')
  pagination(@Param('page') page: string, @Param('limit') limit: string) {
    const paginationDto: any = {};
    paginationDto.page = +page;
    paginationDto.limit = +limit;
    return this.countryService.pagination(paginationDto);
  }
}
