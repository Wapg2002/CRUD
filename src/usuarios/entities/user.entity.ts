/* eslint-disable prettier/prettier */
//Configura la estructura de la tabla en la base de datos 

import { hash } from 'bcryptjs';
import { Producto } from 'src/productos/entities/product.entity';
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 200 })
  nombre: string

  @Column({ type: 'varchar', length: 200 })
  apellido: string;

  @Column({ name:'correo_electronico', type: 'varchar', length: 60, nullable: false })
  correoElectronico: string;

  @Column({ select: false, type: 'varchar', length: 130, nullable: false })
  contrasena: string;

  @Column({ type: 'simple-array' })
  roles: string[]

  @Column({ type: 'boolean', default: true })
  estado: boolean;

  @CreateDateColumn({ name: 'fecha_de_creacion', type: 'timestamp' })
  fechaDeCreacion: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async encriptaContrasena() {
    if (!this.contrasena) return;
    this.contrasena = await hash(this.contrasena, 10);
  }

  @OneToOne(_=> Producto, producto => producto.trabajador, { cascade: true })
  productos: Producto;
}