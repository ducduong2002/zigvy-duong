import { IsString, IsNotEmpty, IsEnum, IsDateString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  task: string;

  @IsString()
  @IsEnum(['low', 'medium', 'high'])
  priority: 'low' | 'medium' | 'high';

  @IsString()
  @IsEnum(['pending', 'in-progress', 'completed'])
  status: 'pending' | 'in-progress' | 'completed';

  @IsDateString()
  date: string;
}
