import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { CityModule } from 'src/city/city.module';
import { CountryModule } from 'src/country/country.module';
import { TourModule } from '../tour/tour.module';
import { AppController } from './controller/app.controller';
import { AppService } from './service/app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal: true,
    }),
    MulterModule.register({
      dest: './upload',
    }),
    MongooseModule.forRoot('mongodb://127.0.0.1/test'),
    TourModule,
    CityModule,
    CountryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
