import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import { Country } from 'src/country/database/country.schema';
import { Tour } from 'src/tour/database/tour.schema';

@Schema({ _id: false })
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

  @Prop({
    type: String,
    ref: 'Country',
  })
  @Type(() => Country)
  country: Country;

  @Prop({
    type: [
      {
        type: String,
        ref: Tour.name,
      },
    ],
  })
  tour: [Tour];
}

export const CitySchema = SchemaFactory.createForClass(City);
