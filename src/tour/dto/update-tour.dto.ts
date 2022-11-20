import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { TypeHotelEnum } from '../enums/tour.enum';

export class UpdateTourDto {
  @ApiHideProperty()
  city_id: string;

  @ApiProperty()
  name_tour: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  album_img: string[];

  @ApiProperty({ default: TypeHotelEnum.ONE_STAR })
  type_hotel: TypeHotelEnum;
}
