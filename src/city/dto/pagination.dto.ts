import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

export class PaginationCityDto {
  @ApiHideProperty()
  @ApiProperty()
  limit: number;

  @ApiHideProperty()
  @ApiProperty()
  page: number;
}
