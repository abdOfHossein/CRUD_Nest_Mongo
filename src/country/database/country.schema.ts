import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { type } from 'os';
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

  @Prop({ type: [{type:String,ref:City.name}] })
  city: [City];
}

export const CountrySchema = SchemaFactory.createForClass(Country);
