import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsOptional, ValidateNested } from 'class-validator';
import { IPagination } from 'types/pagination.type';

export class QueryDto implements IPagination {
  @ApiPropertyOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  interval?: [number, number];

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  page?: number;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  limit?: number;
}
