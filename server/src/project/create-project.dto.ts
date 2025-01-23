import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsOptional,
} from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  project: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  owner: string;

  @IsDateString()
  date: string;

  @IsOptional()
  @IsString()
  _id?: string;
}
