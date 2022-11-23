import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ICountry } from 'src/country/database/country.interface';
import { ICity } from '../database/city.interface';
import { CreateCityDto } from '../dto/create-city.dto';
import { PaginationCityDto } from '../dto/pagination.dto';
import { UpdateCityDto } from '../dto/update-city.dto';

@Injectable()
export class CityService {
  constructor(
    @InjectModel('City') private readonly cityModel: Model<ICity>,
    @InjectModel('Country') private readonly countryModel: Model<ICountry>,
  ) {}

  async create(createCityDto: CreateCityDto): Promise<ICity> {
    try {
      const city = await this.cityModel.create({
        _id: createCityDto.name_city_en,
        name_city_en: createCityDto.name_city_en,
        name_city_fa: createCityDto.name_city_fa,
      });
      await this.countryModel.findByIdAndUpdate(createCityDto.country_id, {
        cities: [{ city }],
      });
      await city.save();
      return city;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async findAll(filter_value: string | null): Promise<ICity[]> {
    try {
      if (!filter_value) {
        const cities = await this.cityModel.find({});
        return cities;
      }
      const tour = await this.cityModel.findById(filter_value);
      const cities = await this.cityModel.aggregate([
        {
          $match: {
            $or: [
              {
                name_city_en: filter_value,
              },
              {
                name_city_fa: filter_value,
              },
              {
                tour: tour,
              },
            ],
          },
        },
      ]);
      console.log(cities);
      return cities;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async findOne(id: string): Promise<ICity> {
    try {
      return await this.cityModel.findById(id);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async update(id: string, updateCityDto: UpdateCityDto): Promise<ICity> {
    try {
      const newCity = await this.cityModel.findByIdAndUpdate(id, {
        name_city_en: updateCityDto.name_city_en,
        name_city_fa: updateCityDto.name_city_fa,
      });
      const cities = await this.countryModel.find({
        _id: updateCityDto.country_id,
        cities: {
          $elemMatch: {
            'city._id': id,
          },
        },
      });
      console.log(cities);
      console.log(id);
      console.log(updateCityDto.country_id);

      const result = await this.countryModel.updateOne(
        {
          _id: updateCityDto.country_id,
          cities: {
            $elemMatch: {
              'city._id': id,
            },
          },
        },
        {
          $set: {
            'cities.$city.name_city_en': updateCityDto.name_city_en,
            'cities.$city.name_city_fa': updateCityDto.name_city_fa,
          },
        },
      );
      console.log(result);

      return newCity;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async pagination(paginationDto: PaginationCityDto): Promise<ICity[] | any> {
    try {
      const page: number = paginationDto.page || 1;
      return await this.cityModel
        .find({})
        .sort({ name_city_en: 1 })
        .skip((page - 1) * paginationDto.limit)
        .limit(paginationDto.limit)
        .exec();
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}
