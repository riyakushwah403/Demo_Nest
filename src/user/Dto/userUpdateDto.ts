import {
  IsString,
  IsAlpha,
  IsNotEmpty,
  IsOptional,
  Matches,
  IsEnum,
  IsNumber,
  IsDateString,
  IsDate,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserGender } from '../Enum/gender';
import { Transform, Type } from 'class-transformer';

export class userUpdateDto {
  @IsString()
  @IsAlpha()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({
    type: String,
    description: 'Update User Name',
    required: false,
    example: 'demoo',
  })
  name: string;

  @IsString()
  @Matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
  @IsOptional()
  @ApiProperty({
    type: String,
    description: 'update User Email',
    required: false,
    example: 'demo123@gmil.com',
  })
  email: string;

  @IsEnum(UserGender)
  @IsOptional()
  @ApiProperty({
    type: String,
    description: 'user Gender ',
    required: false,
  })
  gender: string;

  @IsString()
  @IsOptional()
  @Matches(/^\d{10}$/)
  @ApiProperty({
    type: Number,
    description: 'Update user contact no',
    required: false,
    example: '8880344456, +918880344456',
  })
  contactNo: number;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({
    type: String,
    description:
      'Set Password That Must Be 8 Characters Including Letter , Number and symbol',
    example: 'password123@',
    required: false,
  })
  @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()]).{8,}$/)
  password: string;

  @IsDate()
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  @Type(() => Date)
  @ApiProperty({
    type: Date,
    required: false,
    description: 'update user date of birth',
  })
  DOB: Date;

  @IsString()
  @IsOptional()
  @ApiProperty({
    type: String,
    description: 'update user Address',
    required: false,
    example: 'Indore',
  })
  address: string;
}
