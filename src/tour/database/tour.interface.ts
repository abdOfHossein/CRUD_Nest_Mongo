import { TypeHotelEnum } from '../enums/tour.enum';

export interface ITour extends Document{
  name_tour:string;
  price: number;
  album_img: string[];
  type_hotel: TypeHotelEnum;
}
