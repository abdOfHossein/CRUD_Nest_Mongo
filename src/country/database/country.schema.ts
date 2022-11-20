import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

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
}

export const CountrySchema = SchemaFactory.createForClass(Country);
