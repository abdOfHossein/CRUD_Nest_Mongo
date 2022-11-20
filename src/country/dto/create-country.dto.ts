import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

export class CreateCountryDto {
  @ApiHideProperty()
  _id: string;

  @ApiProperty()
  name_country_en: string;

  @ApiProperty()
  name_country_fa: string;
}
