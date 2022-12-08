import { Body, Controller, Get, Query, Post, Put } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateCityDto } from '../dto/create-city.dto';
import { PaginationCityDto } from '../../../common/dto/pagination.dto';
import { UpdateCityDto } from '../dto/update-city.dto';
import { CityService } from '../service/city.service';

@ApiTags('City')
@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}
  private paginationCityDto: PaginationCityDto;

  @Post()
  create(
    @Query('country_id') country_id: string,
    @Body() createCityDto: CreateCityDto,
  ) {
    createCityDto.country_id = country_id;
    return this.cityService.create(createCityDto);
  }

  @ApiQuery({name:'filter_value',required:false})
  @Get('/filter')
  findAll(@Query('filter_value') filter_value: string) {
    return this.cityService.findAll(filter_value);
  }

  @Get('/readOne')
  findOne(@Query('id') id: string) {
    return this.cityService.findOne(id);
  }

  @Put()
  update(
    // @Query('country_id') country_id: string,
    @Query('id') id: string,
    @Body() updateCityDto: UpdateCityDto,
  ) {
    // updateCityDto.country_id = country_id;
    return this.cityService.update(id, updateCityDto);
  }


  @ApiQuery({name:'page',required:false})
  @ApiQuery({name:'limit',required:false})
  @Get('/page')
  pagination(@Query('page') page: string, @Query('limit') limit: string) {
    const paginationDto: any = {};
    paginationDto.page = +page;
    paginationDto.limit = +limit;
    return this.cityService.pagination(paginationDto);
  }
}
