import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Matches } from 'class-validator';
import { Country } from 'src/modules/country/database/country.schema';

export class CreateCityDto {
  @ApiHideProperty()
  country_id: string;

  @ApiHideProperty()
  country: Country;

  @ApiHideProperty()
  _id: string;

  @Matches(/^[A-Za-z]+$/g)
  @ApiProperty()
  name_city_en: string;

  @Matches(/^[\u0600-\u06FF\s]+$/)
  @ApiProperty()
  name_city_fa: string;
}
