import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

export class UpdateCountryDto {
  @ApiHideProperty()
  city_id: string;

  @ApiProperty()
  name_country_en: string;

  @ApiProperty()
  name_country_fa: string;
}
