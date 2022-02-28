/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Auth, User } from 'src/common/decorators';
import { Usuario } from 'src/usuarios/entities';
import { AuthService } from './auth.service';
import { LocalAuthGuard, JwtAuthGuard } from './guards';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)//Aca usamos las estrategias
  @Post('login')
  login(@User() user: Usuario) {
    const data = this.authService.login(user);
    return {
      message: 'Login exitoso',
      data,
    };
  }

  //Esta ruta se vuelve privada al usar JwtAuthGuard
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  profile(@User() usuario: Usuario) {
    return {
      message: 'Peticion extitosa',
      usuario
    };
  }

  //@Auth() //-> decorador creado por nosotros para reducir @UseGuards(JwtAuthGuard) y @ApiBearerAuth()
  @Auth()
  @Get('refresh')
  refreshToken(@User() user: Usuario) {
    const data = this.authService.login(user);
    return {
      message: 'Refresh exitoso',
      data,
    };
  }
}
