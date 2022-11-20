import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

export class CreateCityDto {
  @ApiHideProperty()
  _id: string;

  @ApiProperty()
  name_city_en: string;

  @ApiProperty()
  name_city_fa: string;
}
