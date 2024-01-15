import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  IsArray,
  ValidateNested,
  IsIn,
  Length,
  IsNumberString,
} from 'class-validator';
import { UserRoles } from 'globals/constants';

export class UserDto {
  @ApiPropertyOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @IsIn(Object.values(UserRoles), { message: 'Хэрэглэгчийн эрх буруу байна' })
  readonly role: string[];

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly lastName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsNumberString()
  @Length(8, 8)
  readonly phoneNumber: string;

  @ApiProperty()
  @IsString()
  @IsStrongPassword({}, { message: 'Нууц үг амархан таагдахаар байна' })
  readonly password: string;
}
