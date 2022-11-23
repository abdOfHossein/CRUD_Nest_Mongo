import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ICity } from 'src/city/database/city.interface';
import { PaginationCityDto } from 'src/common/dto/pagination.dto';
import { ITour } from '../database/tour.interface';
import { CreateTourDto } from '../dto/create-tour.dto';
import { UpdateTourDto } from '../dto/update-tour.dto';

@Injectable()
export class TourService {
  constructor(
    @InjectModel('Tour') private readonly tourModel: Model<ITour>,
    @InjectModel('City') private readonly cityModel: Model<ICity>,
  ) {}

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
      });

      await this.cityModel.findByIdAndUpdate(createTourDto.city_id, {
        tours: [tour],
      });

      await tour.save();
      return tour;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async findAll(filter_value: string): Promise<ITour[]> {
    try {
      const tours = await this.tourModel.aggregate([
        {
          $match: {
            name_tour: filter_value,
          },
        },
      ]);
      return tours;
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
      const newTour = await this.tourModel.findByIdAndUpdate(id, {
        $set: {
          price: updateTourDto.price,
          name_tour: updateTourDto.name_tour,
          type_hotel: updateTourDto.type_hotel,
          album_img: updateTourDto.album_img,
          city_id: updateTourDto.city_id,
        },
      });
      return newTour;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async pagination(paginationDto: PaginationCityDto): Promise<ITour[]> {
    try {
      const page: number = paginationDto.page || 1;
      return await this.tourModel
        .find({})
        .sort({ createdAt: -1 })
        .skip((page - 1) * paginationDto.limit)
        .limit(paginationDto.limit)
        .exec();
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}
