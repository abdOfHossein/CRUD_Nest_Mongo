import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { UpdateTourDto } from '../dto/update-tour.dto';
import { TourService } from '../service/tour.service';

import { diskStorage } from 'multer';
import * as path from 'path';
import { Helper } from 'src/configs/multer/multer.helper';
import { CreateTourDto } from '../dto/create-tour.dto';
const pngFileFilter = (req, file, callback) => {
  let ext = path.extname(file.originalname);
  if (ext !== '.png') {
    req.fileValidationError = 'Invalid file type';
    return callback(new Error('Invalid file type'), false);
  }
  return callback(null, true);
};

@ApiTags('Tour')
@Controller('tour')
export class TourController {
  constructor(private readonly tourService: TourService) {}

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file1: {
          type: 'string',
          format: 'binary',
        },
        file2: {
          type: 'string',
          format: 'binary',
        },
        file3: {
          type: 'string',
          format: 'binary',
        },

        name_tour: {
          type: 'string',
        },
        price: {
          type: 'string',
        },
        type_hotel: {
          type: 'TypeHotelEnum',
        },
      },
    },
  })
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'file1', maxCount: 1 },
        { name: 'file2', maxCount: 1 },
        { name: 'file3', maxCount: 1 },
      ],
      {
        storage: diskStorage({
          destination: Helper.destinationPath,
          filename: Helper.customFileName,
        }),
      },
    ),
  )
  @Post()
  async create(
    @Query('city_id') city_id: string,
    @UploadedFiles()
    files: {
      file1: Express.Multer.File;
      file2: Express.Multer.File;
      file3: Express.Multer.File;
    },
    @Body() createTourDto: CreateTourDto,
  ) {
    try {
      createTourDto.img_file = { ...files };
      createTourDto.city_id = city_id;
      return this.tourService.create(createTourDto);
    } catch (e) {
      console.log(e);
    }
  }

  @Get('/filter')
  findAll(@Query('filter_value') filter_value: string) {
    console.log(filter_value);

    return this.tourService.findAll(filter_value);
  }

  @Get('/readOne')
  findOne(@Query('id') id: string) {
    return this.tourService.findOne(id);
  }

  @Put()
  update(
    // @Param('city_id') city_id: string,
    @Query('id') id: string,
    @Body() updateTourDto: UpdateTourDto,
  ) {
    // updateTourDto.city_id = city_id;
    return this.tourService.update(id, updateTourDto);
  }

  @Get('page')
  pagination(@Query('page') page: string, @Param('limit') limit: string) {
    const paginationDto: any = {};
    paginationDto.page = +page;
    paginationDto.limit = +limit;
    return this.tourService.pagination(paginationDto);
  }
}