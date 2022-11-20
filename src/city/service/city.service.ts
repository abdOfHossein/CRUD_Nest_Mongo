import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ICountry } from 'src/country/database/country.interface';
import { ICity } from '../database/city.interface';
import { CreateCityDto } from '../dto/create-city.dto';
import { UpdateCityDto } from '../dto/update-city.dto';

@Injectable()
export class CityService {
  constructor(
    @InjectModel('City') private readonly cityModel: Model<ICity>,
    @InjectModel('Country') private readonly countryModel: Model<ICountry>,
  ) {}

  async create(createCityDto: CreateCityDto): Promise<ICity> {
    try {
      console.log(createCityDto);

      const city: any = await this.cityModel.create({
        _id: createCityDto.name_city_en,
        name_city_en: createCityDto.name_city_en,
        country_id: createCityDto.country_id,
        name_city_fa: createCityDto.name_city_fa,
      });
      await city.save();
      return city;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async findAll(): Promise<ICity[]> {
    try {
      const result = await this.cityModel.find({}).populate('country_id');
      console.log(result);
      return result;
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
      const result = await this.cityModel.findByIdAndUpdate(id, {
        country_id: updateCityDto.country_id,
        name_city_en: updateCityDto.name_city_en,
        name_city_fa: updateCityDto.name_city_fa,
      });
      console.log(result);
      return result;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}
