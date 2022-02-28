import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from './entities/product.entity';
import { ProductosController } from './productos.controller';
import { ProductosService } from './productos.service';

@Module({
  imports: [
    //forFeature recibe un arreglo de entidades
    TypeOrmModule.forFeature([Producto]),
  ],
  controllers: [ProductosController],
  providers: [ProductosService],
})
export class ProductosModule {}
