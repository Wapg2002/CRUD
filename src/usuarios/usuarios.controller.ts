/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { InjectRolesBuilder, RolesBuilder } from 'nest-access-control';
import { AppResource, AppRole } from 'src/app.roles';
import { Auth, User } from 'src/common/decorators';
import { CreateUserDto, EditUserDto, UserRegistrationDto } from './dtos';
import { Usuario } from './entities';
import { UsuariosService } from './usuarios.service';

@Controller('usuarios')
export class UsuariosController {
  constructor(
    private readonly usuarioService: UsuariosService,
    @InjectRolesBuilder()
    private readonly rolesBuilder: RolesBuilder,
  ) {}

  @Get()
  async getUsuarios() {
    const data = await this.usuarioService.getUsuarios();
    return { message: 'consulta exitosa', data };
  }

  @Get(':id')
  async getUsuario(
    @Param('id', ParseIntPipe) id
  ) {
    const data = await this.usuarioService.getUsuario(id);
    return { message: 'consulta de id exitosa', data };
  }

  @Post('registro')
  async registrarUsuario(
    @Body() dto: UserRegistrationDto) {
    const data = await this.usuarioService.crearUsuario({
      ...dto,
      roles: [AppRole.WORKER],
    });
    return { message: 'Usuario registrado', data };
  }

  @Auth({
    possession: 'any',
    action: 'create',
    resource: AppResource.USER //Este metodo puede ser usado por usuarios con permiso de crear cualquier usuario
  })
  @Post()
  async crearUsuario(
    @Body() dto: CreateUserDto
  ) {
    const data = await this.usuarioService.crearUsuario(dto);
    return { message: 'Usuario creado con éxito', data };
  }

  @Auth({
    possession: 'own',
    action: 'update',
    resource: AppResource.USER
  })
  @Put(':id')
  async editarUsuario(
    @Param('id', ParseIntPipe) id,
    @Body() dto: EditUserDto,
    @User() usuario: Usuario, // <-- @User respresenta al usuario que se loguea
  ) {
    console.log(usuario, "usuario que se loguea");

    let data;
    if (
      this.rolesBuilder
      .can(usuario.roles)
      .updateAny(AppResource.USER)
      .granted
    ) {
      //Es admin
      data = await this.usuarioService.editarUsuario(id, dto);
    } else {
      //Es autor
      const { roles, ...rest } = dto;
      data = await this.usuarioService.editarUsuario(id, rest, usuario);
    } 
    return { message: 'Usuario actualizado con éxito', data };
  }

  @Auth({
    possession: 'own',
    action: 'delete',
    resource: AppResource.USER,
  })
  @Delete(':id')
  async borrarUsuario(
    @Param('id', ParseIntPipe) id,
    @User() usuario: Usuario
  ) {
    let data;
    if (
      this.rolesBuilder
      .can(usuario.roles)
      .updateAny(AppResource.USER)
      .granted
    ) {
      //Es admin
      data = await this.usuarioService.borrarUsuario(id);
    } else {
      //Es autor
      data = await this.usuarioService.borrarUsuario(id, usuario);
    } 
    return { message: 'Usuario eliminado con éxito', data };
  }

}
