import { Country } from 'src/country/database/country.schema';

export interface ICity extends Document {
  _id: string;
  name_city_en: string;
  name_city_fa: string;
}
