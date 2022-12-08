import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Country, CountrySchema } from 'src/modules/country/database/country.schema';
import { CityController } from './controller/city.controller';
import { City, CitySchema } from './database/city.schema';
import { CityService } from './service/city.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: City.name, schema: CitySchema },
      { name: Country.name, schema: CountrySchema },
    ]),
  ],
  controllers: [CityController],
  providers: [CityService],
})
export class CityModule {}
