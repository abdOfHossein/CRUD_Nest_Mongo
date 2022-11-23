import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { City } from 'src/city/database/city.schema';

@Schema({ _id: false })
export class Country {
  @Prop({
    type: String,
  })
  _id: string;

  @Prop({
    type: String,
  })
  name_country_en: string;

  @Prop({
    type: String,
  })
  name_country_fa: string;

  @Prop()
  cities:City[]
}

export const CountrySchema = SchemaFactory.createForClass(Country);
