/* eslint-disable prettier/prettier */
import { ConfigService } from "@nestjs/config";
import { Usuario } from "src/usuarios/entities";
import { getRepository } from "typeorm";

export const usuarioPorDefecto = async (config: ConfigService) => {
  const usuarioRepository = getRepository<Usuario>(Usuario)

  const usuarioPorDefecto = await usuarioRepository
    .createQueryBuilder()
    .where('correo_electronico = :correo_electronico', { 
      correo_electronico: config.get<string>('DEFAULT_USER_EMAIL'),
    })
    .getOne();

  if (!usuarioPorDefecto) {
    const administrador = usuarioRepository.create({
      nombre: "Rengoku",
      apellido: "Kyojuro",
      correoElectronico: config.get<string>('DEFAULT_USER_EMAIL'),
      contrasena: config.get<string>('DEFAULT_USER_PASSWORD'),
      roles: ['ADMIN']
    });

    return await usuarioRepository.save(administrador);
  }
}