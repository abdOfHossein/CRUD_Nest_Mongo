import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { City, CitySchema } from 'src/city/database/city.schema';
import { TourController } from './controller/tour.controller';
import { Tour, TourSchema } from './database/tour.schema';
import { TourService } from './service/tour.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Tour.name, schema: TourSchema },
      { name: City.name, schema: CitySchema },
    ]),
  ],
  controllers: [TourController],
  providers: [TourService],
})
export class TourModule {}
