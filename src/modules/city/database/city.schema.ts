import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Tour } from 'src/modules/tour/database/tour.schema';

@Schema({ _id: false, timestamps: true })
export class City {
  @Prop({
    type: String,
  })
  _id: string;

  @Prop({
    type: String,
  })
  name_city_en: string;

  @Prop({
    type: String,
  })
  name_city_fa: string;

  @Prop()
  tours: Tour[];
}

export const CitySchema = SchemaFactory.createForClass(City);
