/* eslint-disable prettier/prettier */
import { Usuario } from 'src/usuarios/entities';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('productos')
export class Producto {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 130 })
  categoria: string;

  @Column({ type: 'varchar', length: 255 })
  nombre: string;

  @Column({ type: 'int' })
  cantidad: number;

  @Column({ type: 'int' })
  precio: number;

  @Column({ type: 'varchar', length: 50 })
  estado: string;

  @CreateDateColumn({ type: 'timestamp' })
  fechaDeCreacion: Date;

  @ManyToOne(_=> Usuario, (usuario) => usuario.productos, { eager: true })
  @JoinColumn({ name: 'trabajador' })
  trabajador: Usuario;
}