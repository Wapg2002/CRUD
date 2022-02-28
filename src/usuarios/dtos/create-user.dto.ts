/* eslint-disable prettier/prettier */
import {
  IsArray,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { AppRole } from 'src/app.roles';
import { EnumToString } from 'src/common/helpers/enumToString';

export class CreateUserDto {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  nombre: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  apellido: string;

  @IsEmail()
  correoElectronico: string;

  @IsString()
  @MinLength(8)
  @MaxLength(128)
  contrasena: string;

  @IsArray()
  @IsEnum(AppRole, {
    each: true, //verificamos cada uno de los valores del array
    message: `El rol debe tener uno de los siguientes valores: ${EnumToString(AppRole)}`,
  })
  roles: string[];
}