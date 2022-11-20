import { ApiProperty } from "@nestjs/swagger";

export class UpdateCityDto {
  @ApiProperty()
  name_city_en: string;

  @ApiProperty()
  name_city_fa: string;
}
