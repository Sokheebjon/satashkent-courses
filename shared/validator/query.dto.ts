import { Expose, Transform } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';
import { Trim } from './trim';
import { ParseFilter } from './custom/parseFilter';

export class PagingQueryDto {
  @Expose({ toClassOnly: true })
  @Transform(({ value }) => Number(value) || 1)
  @IsOptional()
  @IsInt()
  page: number;

  @Expose({ toClassOnly: true })
  @Transform(({ value }) => Number(value) || 10)
  @IsOptional()
  @IsInt()
  limit: number;

  @Transform(({ value }) => Trim(value))
  @Expose({ toClassOnly: true })
  @IsOptional()
  @Transform(({ value }) => value || '')
  @IsString()
  search: string;

  @Expose({ toClassOnly: true })
  @Transform(({ value }) => value || '_id')
  @IsOptional()
  @IsString()
  sortBy: string;

  @Expose({ toClassOnly: true })
  @Transform(({ value }) => value || 1)
  @IsOptional()
  @IsInt()
  sortOrder: 1 | -1;

  @Expose({ toClassOnly: true })
  @Transform(({ value }) => value || {})
  @ParseFilter({ groups: ['GET'] })
  filterP: any;
  filter: any;

  @Expose({ toClassOnly: true })
  @Transform(({ value }) => value || {})
  sortP: any;
  sort: any;
}
