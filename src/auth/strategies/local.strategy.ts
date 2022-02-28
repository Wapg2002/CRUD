/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService
  ) {
    super({
      usernameField: 'correoElectronico', //Lo que hacemos es decir que el campo username se va a llamar email, ya que por defecto se llama username
      passwordField: 'contrasena'
    })
  }

  async validate(email: string, password: string) {
    console.log(email, password, "validate");
    
    const user = await this.authService.validateUser(email, password);
    if (!user) throw new UnauthorizedException('Correo o contrasena invalidos');
    
    
    return user;
  }
}