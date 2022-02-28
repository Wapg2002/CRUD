/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, EditUserDto } from './dtos';
import { Usuario } from './entities';

export interface UserFindOne {
  id?: number;
  correoElectronico?: string;
}

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async getUsuarios(): Promise<Usuario[]> {
    return await this.usuarioRepository.find();
  }

  async getUsuario(id: number, usuarioEntity?: Usuario): Promise<Usuario> {
    const usuario = await this.usuarioRepository
      .findOne(id)
      .then(u => (!usuarioEntity) ? u : !!u &&(usuarioEntity.id === u.id) ? u : null);
    
    if (!usuario) 
      throw new NotFoundException('El usuario solicitado no existe o este usuario no esta autorizado');
    return usuario;
  }

  async crearUsuario(dto: CreateUserDto): Promise<Usuario> {
    console.log("dto", dto);
    
    const usuarioExiste = await this.usuarioRepository.findOne({ correoElectronico: dto.correoElectronico });
    if (usuarioExiste)
      throw new BadRequestException(
        'Ya existe un usuario registrado con este correo.',
      );
  
    const usuarioNuevo = this.usuarioRepository.create(dto);
    const usuario = await this.usuarioRepository.save(usuarioNuevo);

    delete usuario.contrasena;
    return usuario;
  }

  async editarUsuario(id: number, dto: EditUserDto, usuarioEntity?: Usuario) {
    const usuario = await this.getUsuario(id, usuarioEntity);
    const usuarioEditado = Object.assign(usuario, dto);
    return await this.usuarioRepository.save(usuarioEditado);
  }

  async borrarUsuario(id: number, usuarioEntity?: Usuario): Promise<Usuario> {
    const usuario = await this.getUsuario(id, usuarioEntity);
    return await this.usuarioRepository.remove(usuario);
  }

  async buscarPorEmail(data: UserFindOne){
    //Debido a que en la entidad usuario indicamos que la contraseña no se incluyera en las respuestas, debemos hacer uso de QueryBuilders(funciones de typeORM), las cuales permiten trabajar de manera elegante las querys y que se parezcan a las querys de SQL
    return await this.usuarioRepository
    .createQueryBuilder('user')
    .where(data) //where va a retornar el registro donde el email pasado coincida con un email de la BD
    .addSelect('user.contrasena') //addSelect indica que se muestre la contraseña
    .getOne(); //Con esto indicamos que se devuelva un objeto. Porque si no no se devuelve nada
  }

}
