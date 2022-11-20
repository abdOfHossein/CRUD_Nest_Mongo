import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ICountry } from '../database/country.interface';
import { CreateCountryDto } from '../dto/create-country.dto';
import { UpdateCountryDto } from '../dto/update-country.dto';

@Injectable()
export class CountryService {
  constructor(
    @InjectModel('Country') private readonly countryModel: Model<ICountry>,
  ) {}
  async create(createCountryDto: CreateCountryDto) {
    try {
      const country = await this.countryModel.create({
        name_country_en: createCountryDto.name_country_en,
        name_country_fa: createCountryDto.name_country_fa,
        _id: createCountryDto.name_country_en,
      });

      await country.save();
      return country;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async findAll() {
    try {
      return await this.countryModel.find({})
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async findOne(id: string) {
    try {
      return await this.countryModel.findById(id);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async update(id: string, updateCountryDto: UpdateCountryDto) {
    try {
      return await this.countryModel.findByIdAndUpdate(id, {
        name_country_en: updateCountryDto.name_country_en,
        name_country_fa: updateCountryDto.name_country_fa,
      });
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}
