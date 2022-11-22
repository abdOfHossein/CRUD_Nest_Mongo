import { Country } from 'src/country/database/country.schema';

export interface ICity extends Document {
  country: Country;
  _id: string;
  name_city_en: string;
  name_city_fa: string;
}
