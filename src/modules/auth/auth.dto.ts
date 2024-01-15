import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString, IsString, Length } from 'class-validator';

export class AuthDto {
  @ApiProperty({
    default: '99509101',
  })
  @IsString()
  @IsNotEmpty()
  @IsNumberString(
    {},
    { message: 'Утасны дугаар зөвхөн тооноос бүтсан байх шаардлагатай' },
  )
  @Length(8, 8, { message: 'Утасны дугаарын урт 8 тэмдэгт байх шаардлагатай' })
  phoneNumber: string;

  @ApiProperty({
    default: 'superPa$$$',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
