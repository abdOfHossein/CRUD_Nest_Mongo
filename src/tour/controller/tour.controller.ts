import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
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
        file: {
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
    FileInterceptor('file', {
      storage: diskStorage({
        destination: Helper.destinationPath,
        filename: Helper.customFileName,
      }),
    }),
  )
  // @ApiProperty({
  //   enum: ['ali', 'rezaz'],
  // })
  @Post(':city_id')
  async create(
    @Param('city_id') city_id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() createTourDto: CreateTourDto,
  ) {
    try {
      createTourDto.img_file = file;
      createTourDto.city_id = city_id;
      return this.tourService.create(createTourDto);
    } catch (e) {
      console.log(e);
    }
  }

  @Get()
  findAll() {
    return this.tourService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tourService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('city_id') city_id: string,
    @Param('id') id: string,
    @Body() updateTourDto: UpdateTourDto,
  ) {
    updateTourDto.city_id = city_id;
    return this.tourService.update(id, updateTourDto);
  }
}
function ApiImplicitParams(arg0: any[]) {
  throw new Error('Function not implemented.');
}
