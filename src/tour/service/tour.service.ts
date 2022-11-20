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
      const tour = await this.tourModel.create({});
      (tour.price = createTourDto.price),
        (tour.name_tour = createTourDto.name_tour),
        (tour.type_hotel = createTourDto.type_hotel),
        (tour.album_img = createTourDto.img_file.filename);

      await tour.save();
      return tour;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async findAll(): Promise<ITour[]> {
    try {
      return await this.tourModel.find({});
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
      });
      console.log(result);
      return result;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}
