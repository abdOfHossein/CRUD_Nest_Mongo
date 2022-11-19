import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { TypeHotelEnum } from '../enums/tour.enum';


export type TourDocument = HydratedDocument<Tour>;

@Schema()
export class Tour {
//   @Prop({
//     ref: 'City',
//   })
//   city: string;

  @Prop({
    type: Number,
    required: true,
  })
  price: number;

  @Prop({
    type: Array,
    required: true,
  })
  album_img: string[];

  @Prop({
    type: 'enum',
    required: true,
    default: TypeHotelEnum.ONE_STAR,
  })
  type_hotel: TypeHotelEnum;
}

export const TourSchema = SchemaFactory.createForClass(Tour);
