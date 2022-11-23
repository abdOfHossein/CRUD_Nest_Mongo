import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaginationCityDto } from 'src/common/dto/pagination.dto';
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

  async findAll(filter_value: string) {
    try {
      const city = await this.countryModel.findById(filter_value);
      return await this.countryModel.aggregate([
        {
          $match: {
            $or: [
              {
                name_country_en: filter_value,
              },
              {
                name_country_fa: filter_value,
              },
              {
                city,
              },
            ],
          },
        },
      ]);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async getOne(id: string) {
    try {
      console.log(id);
      
      const country = await this.countryModel.findById(id);
      console.log(country);
      return country;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async update(id: string, updateCountryDto: UpdateCountryDto) {
    try {
      console.log(id);
      console.log(updateCountryDto);

      const result = await this.countryModel.findOneAndUpdate(
        { _id: id },
        {
          name_country_en: updateCountryDto.name_country_en,
          name_country_fa: updateCountryDto.name_country_fa,
        },
      );
      console.log(result);
      return result;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async pagination(paginationDto: PaginationCityDto): Promise<ICountry[]> {
    try {
      const page: number = paginationDto.page || 1;
      return await this.countryModel
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
