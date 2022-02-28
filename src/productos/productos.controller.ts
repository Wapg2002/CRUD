/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { InjectRolesBuilder, RolesBuilder } from 'nest-access-control';
import { AppResource } from 'src/app.roles';
import { Auth, User } from 'src/common/decorators';
import { Usuario } from 'src/usuarios/entities';
import { CreateProductDto, EditProductDto } from './dtos';
import { ProductosService } from './productos.service';

@Controller('productos')
export class ProductosController {
  constructor(
    private readonly productoService: ProductosService,
    @InjectRolesBuilder()
    private readonly rolesBuilder: RolesBuilder) {}

  @Get()
  async getProductos() {
    const data = await this.productoService.getProductos();
    return { message: 'consulta exitosa', data };
  }

  @Get(':id')
  async getProducto(@Param('id', ParseIntPipe) id) {
    const data = await this.productoService.getProducto(id);
    return { message: 'consulta de id exitosa', data };
  }

  @Auth({
    possession: 'own',
    action: 'create',
    resource: AppResource.PRODUCTO
  }) //protege las rutas
  @Post()
  async crearProducto(
    @Body() dto: CreateProductDto,
    @User() trabajador: Usuario
  ) {
    const data = await this.productoService.crearProducto(dto, trabajador);
    return { message: 'Producto creado con éxito', data };
  }

  @Auth({
    possession: 'own',
    action: 'update',
    resource: AppResource.PRODUCTO
  })
  @Put(':id')
  async editarProducto(
    @Param('id', ParseIntPipe) id,
    @Body() dto: EditProductDto, 
    @User() trabajador: Usuario
  ) {
    console.log(dto);
    let data;

    if (
      this.rolesBuilder
      .can(trabajador.roles)
      .updateAny(AppResource.PRODUCTO)
      .granted
    ) {
      // Puede editar cualquier Producto...
      data = await this.productoService.editarProducto(id, dto);
    } else {
      // Puede editar solo los propios...
      data = await this.productoService.editarProducto(id, dto, trabajador);
    }

    return { message: 'Producto editado', data };
  }

  @Auth({
    possession: 'own',
    action: 'delete',
    resource: AppResource.PRODUCTO
  })
  @Delete(':id')
  async borrarProducto(
    @Param('id', ParseIntPipe) id,
    @User() trabajador: Usuario
  ) {
    let data;
    console.log("delet");
    

    if (
      this.rolesBuilder
      .can(trabajador.roles)
      .deleteAny(AppResource.PRODUCTO)
      .granted
    ) {
      data = await this.productoService.eliminarProducto(id);
    } else {
      data = await this.productoService.eliminarProducto(id, trabajador);
    }
    return { message: 'Producto eliminado', data };
  }
  
}
