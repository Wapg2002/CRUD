/* eslint-disable prettier/prettier */
//Creamos un decorador que reduzca los decoradores @UseGuards(JwtAuthGuard)  y @ApiBearerAuth() al decorador @Auth()

import { applyDecorators, UseGuards } from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import { ACGuard, Role, UseRoles } from 'nest-access-control';
import { JwtAuthGuard } from "src/auth/guards";

export function Auth(...roles: Role[]) {
  return applyDecorators(
    UseGuards(JwtAuthGuard, ACGuard), //ACGUard verifica que el usuario tenga los permisos para ejecutar este metodo. Pero, para que esto funcione es necesario el decorador @UseRoles) //Una ruta se vuelve privada al usar JwtAuthGuard
    UseRoles(...roles),
    ApiBearerAuth(),
  )
}