import { ApiProperty } from '@nestjs/swagger';

export class CreateCountryDto {
  @ApiProperty()
  name_country_en: string;

  @ApiProperty()
  name_country_fa: string;
}
