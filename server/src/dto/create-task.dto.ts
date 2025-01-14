import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsDateString,
} from 'class-validator';
import { Types } from 'mongoose';
export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsDateString() // Đảm bảo giá trị là định dạng ngày hợp lệ
  createDate: string; // Thay đổi từ 'description' thành 'createDate'

  @IsOptional()
  @IsString()
  status?: string;

  @IsNotEmpty()
  @IsString()
  userId: string; // Khóa ngoại liên kết với User
}

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsDateString() // Đảm bảo giá trị là định dạng ngày hợp lệ
  createDate?: string; // Thay đổi từ 'description' thành 'createDate'

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  userId?: Types.ObjectId;
}
