import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Matches } from 'class-validator';

export class UpdateCityDto {
  @ApiHideProperty()
  country_id: string;

  @Matches(/^[A-Za-z]+$/g)
  @ApiProperty()
  name_city_en: string;

  @Matches(/^[\u0600-\u06FF\s]+$/)
  @ApiProperty()
  name_city_fa: string;
}
