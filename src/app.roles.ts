/* eslint-disable prettier/prettier */
import { RolesBuilder } from 'nest-access-control';

export enum AppRole {
  WORKER = 'WORKER',
  ADMIN = 'ADMIN'
}

export enum AppResource {
  USER = 'USER',
  PRODUCTO = 'PRODUCTO'
}

export const roles: RolesBuilder = new RolesBuilder();

roles
  //ROLES DEL WORKER
  .grant(AppRole.WORKER)
  .updateOwn([AppResource.USER])
  .deleteOwn([AppResource.USER])
  .createOwn([AppResource.PRODUCTO])
  .updateOwn([AppResource.PRODUCTO])
  .deleteOwn([AppResource.PRODUCTO])
  //ROLES DEL ADMINISTRADOR
  .grant(AppRole.ADMIN)
  .extend(AppRole.WORKER) //Heredamos los permisos del trabajador
  .createAny([AppResource.USER])
  .updateAny([AppResource.PRODUCTO, AppResource.USER])
  .deleteAny([AppResource.PRODUCTO, AppResource.USER])