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

  @Get()
  findAll() {
    return this.countryService.findAll();
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
}
