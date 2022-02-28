/* eslint-disable prettier/prettier */
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { EnumToString } from 'src/common/helpers/enumToString';
import { ProductCategory, ProductStatus } from '../enums';

export class CreateProductDto {
  @IsNotEmpty()
  @IsEnum(ProductCategory, {
    message: `Opción inválida. Categoria debe contener cualquiera de las siguientes opciones: 
    ${ EnumToString(ProductCategory) }`,
  })
  categoria: string;

  @IsString()
  nombre: string;

  @IsNumber()
  precio: number;

  @IsNumber()
  cantidad: number;

 @IsNotEmpty()
 @IsEnum(ProductStatus, {
    message: `Opción inválida. Disponible debe contener cualquiera de las siguientes opciones: 
    ${ EnumToString(ProductStatus) }`,
  })
  estado: string;

}