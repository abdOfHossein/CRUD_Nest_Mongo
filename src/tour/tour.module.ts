import { Module } from '@nestjs/common';
import { TourService } from './service/tour.service';
import { TourController } from './controller/tour.controller';

@Module({
  controllers: [TourController],
  providers: [TourService]
})
export class TourModule {}
