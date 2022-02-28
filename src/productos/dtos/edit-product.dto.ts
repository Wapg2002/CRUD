/* eslint-disable prettier/prettier */

//Los Mapped Types permiten heredar unicamete las propiedades que se requieran de una clase padre
import { PartialType } from "@nestjs/mapped-types";
import { CreateProductDto } from ".";

//EditPostDto puede heredar las propiedades que requiera de CreatePostDto, para esto se usa PartialType. OmitType permite ignorar ciertas propiedades, esto es útil cuando queremos que ningun usuario pueda editar cierta propiedad
export class EditProductDto extends PartialType(CreateProductDto) {}