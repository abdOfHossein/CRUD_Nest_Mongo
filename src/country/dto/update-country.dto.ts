import { ApiProperty } from '@nestjs/swagger';

export class UpdateCountryDto {
  @ApiProperty()
  name_country_en: string;

  @ApiProperty()
  name_country_fa: string;
}
