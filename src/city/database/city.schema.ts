import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class City {
  @Prop({
    type: String,
  })
  name_city_en: string;

  @Prop({
    type: String,
  })
  name_city_fa: string;
}

export const CitySchema = SchemaFactory.createForClass(City);
