/* eslint-disable prettier/prettier */
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from "passport-jwt";
import { Injectable } from '@nestjs/common';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { JWT_SECRET } from 'src/config/constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
  constructor(
    private readonly usuarioService: UsuariosService,
    private readonly config: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get<string>(JWT_SECRET),
    });
  }

  async validate(payload: any) {
    const { sub: id } = payload;
    return await this.usuarioService.getUsuario(id);
  }
}