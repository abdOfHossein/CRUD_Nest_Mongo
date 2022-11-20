import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { TypeHotelEnum } from '../enums/tour.enum';

@Schema()
export class Tour {
  //   @Prop({
  //     ref: 'City',
  //   })
  //   city: string;

  @Prop({
    type: String,
  })
  name_tour: string;

  @Prop({
    type: Number,
  })
  price: number;

  @Prop({
    type: Array,
  })
  album_img: string[];

  @Prop({
    type: String,
    enum: TypeHotelEnum,
    default: TypeHotelEnum.ONE_STAR,
  })
  type_hotel: TypeHotelEnum;
}

export const TourSchema = SchemaFactory.createForClass(Tour);
