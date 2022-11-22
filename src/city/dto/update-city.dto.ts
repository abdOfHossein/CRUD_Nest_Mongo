import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Country } from 'src/country/database/country.schema';

export class UpdateCityDto {
  @ApiHideProperty()
  country: Country;

  @ApiHideProperty()
  country_id: string;

  @ApiProperty()
  name_city_en: string;

  @ApiProperty()
  name_city_fa: string;
}
