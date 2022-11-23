import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

export class UpdateCityDto {
  @ApiHideProperty()
  country_id: string;

  @ApiProperty()
  name_city_en: string;

  @ApiProperty()
  name_city_fa: string;
}
