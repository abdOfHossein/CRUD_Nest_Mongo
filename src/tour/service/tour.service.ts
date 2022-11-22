import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ITour } from '../database/tour.interface';
import { CreateTourDto } from '../dto/create-tour.dto';
import { UpdateTourDto } from '../dto/update-tour.dto';

@Injectable()
export class TourService {
  constructor(@InjectModel('Tour') private readonly tourModel: Model<ITour>) {}

  async create(createTourDto: CreateTourDto): Promise<ITour> {
    try {
      let album_img: any = {};
      for (const file in createTourDto.img_file) {
        album_img[createTourDto.img_file[file][0]['filename']] =
          createTourDto.img_file[file][0]['path'];
      }
      const tour = await this.tourModel.create({
        price: createTourDto.price,
        name_tour: createTourDto.name_tour,
        type_hotel: createTourDto.type_hotel,
        album_img,
        city_id: createTourDto.city_id,
      });
      console.log(tour);
      
      await tour.save();
      return tour;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async findAll(): Promise<ITour[]> {
    try {
      return await this.tourModel.find({}).populate('city_id');
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async findOne(id: string): Promise<ITour> {
    try {
      return await this.tourModel.findById(id);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async update(id: string, updateTourDto: UpdateTourDto): Promise<ITour> {
    try {
      const result = await this.tourModel.findByIdAndUpdate(id, {
        price: updateTourDto.price,
        name_tour: updateTourDto.name_tour,
        type_hotel: updateTourDto.type_hotel,
        album_img: updateTourDto.album_img,
        city_id: updateTourDto.city_id,
      });
      console.log(result);
      return result;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}
