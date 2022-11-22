import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Country } from 'src/country/database/country.schema';

export class CreateCityDto {
  @ApiHideProperty()
  country_id: string;

  @ApiHideProperty()
  country: Country;

  @ApiHideProperty()
  _id: string;

  @ApiProperty()
  name_city_en: string;

  @ApiProperty()
  name_city_fa: string;
}
