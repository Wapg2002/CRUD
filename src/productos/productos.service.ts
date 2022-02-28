/* eslint-disable prettier/prettier */

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from 'src/usuarios/entities';
import { Repository } from 'typeorm';
import { EditProductDto, CreateProductDto } from './dtos';
import { Producto } from './entities/product.entity';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto)
    private readonly productoRespository: Repository<Producto>
  ) {}

  async getProductos(): Promise<Producto[]> {
    return await this.productoRespository.find();
  }

  async getProducto(id: number, trabajador?: Usuario): Promise<Producto> {
     const producto = await this.productoRespository
      .findOne(id)
      .then(p => (!trabajador) ? p : !!p && (trabajador.id === p.trabajador.id) ? p : null);
    console.log("bien");
    
    if (!producto) 
      throw new NotFoundException('El producto solicitado no existe o no esta autorizado');
    return producto;
  }

  async crearProducto(dto: CreateProductDto, trabajador: Usuario): Promise<Producto> {
    const nuevoProducto = this.productoRespository.create({...dto, trabajador});
    return await this.productoRespository.save(nuevoProducto);
  }

  async editarProducto(id: number, dto: EditProductDto, trabajador?: Usuario) {
    const producto = await this.getProducto(id, trabajador);
    const productoEditado = Object.assign(producto, dto);
    return await this.productoRespository.save(productoEditado);
  }

  async eliminarProducto(id: number, trabajador?: Usuario){
    const producto = await this.getProducto(id, trabajador);
    return await this.productoRespository.remove(producto);
  }
}
