import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Matches } from 'class-validator';

export class CreateCountryDto {
  @ApiHideProperty()
  _id: string;

  @Matches(/^[A-Za-z]+$/g)
  @ApiProperty()
  name_country_en: string;

  @Matches(/^[\u0600-\u06FF\s]+$/)
  @ApiProperty()
  name_country_fa: string;
}
