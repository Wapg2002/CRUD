/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// AuthGuard('local') usa la estrategia local que tiene un nombre predeterminado de local
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}