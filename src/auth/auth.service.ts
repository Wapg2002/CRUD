/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';

import { Usuario } from 'src/usuarios/entities';
import { UsuariosService } from 'src/usuarios/usuarios.service';

@Injectable()
export class AuthService {
  constructor(
    //Inyectamos UserService y JwtService para usar las funciones que ofrecen. Estos servicios los podemos usar gracias a que hemos inyectado los módulos UserModule y JwtModule en el AuthModule. Y Tambian gracias a que se ha exportado el UsuariosService en el UsuariosModule (exports: [UserService])
    private readonly usuarioService: UsuariosService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(correoElectronico: string, contrasena: string): Promise<any> {
    const usuario = await this.usuarioService.buscarPorEmail({ correoElectronico });

    console.log(usuario);

    if (usuario && (await compare(contrasena, usuario.contrasena))) {
      const { contrasena, ...usuarioSinContrasena } = usuario;
      return usuarioSinContrasena;
    }

    return null;
  }

  //login crea el token JWT
  login(user: Usuario) {
    const { id, ...rest } = user; //destructuración del objet user. Sacamos el id del retsto de los datos del user (...rest)

    console.log(id);
    

    //creamos la info del payload del jwt. el sub va a servir para identificar a cada usuario
    const payload = { sub: id };

    return {
      user,
      accesToken: this.jwtService.sign(payload), //Generamos el token
    };
  }
}
