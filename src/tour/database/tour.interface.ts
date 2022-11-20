import { TypeHotelEnum } from '../enums/tour.enum';

export interface ITour extends Document {
  city_id: string;
  name_tour: string;
  price: number;
  album_img: string[];
  type_hotel: TypeHotelEnum;
}
