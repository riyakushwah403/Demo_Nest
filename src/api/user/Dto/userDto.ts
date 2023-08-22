import { IsString, IsAlpha, IsNotEmpty, Matches } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @IsString()
  @IsAlpha()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'User Name',
    example: 'demo',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
  @ApiProperty({
    type: String,
    description: 'User Email Id That is Requitred failed',
    example: 'demo123@gmail.com',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description:
      'Set Password That Must Be 8 Characters Including Letter , Number and symbol',
    example: 'password123@',
  })
  @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()]).{8,}$/)
  password: string;
}
