/* eslint-disable prettier/prettier */
import { OmitType } from "@nestjs/mapped-types";
import { CreateUserDto } from ".";

//Heredamos todas las propiedades de CreateUserDto, de forma que sean obligatorias, e ignoramos la propiedad roles
export class UserRegistrationDto extends OmitType(CreateUserDto, ['roles'] as const) {}