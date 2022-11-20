import { ApiProperty } from "@nestjs/swagger";

export class CreateCityDto {

     @ApiProperty()
     name_city_en: string;

     @ApiProperty()
     name_city_fa: string;

}
