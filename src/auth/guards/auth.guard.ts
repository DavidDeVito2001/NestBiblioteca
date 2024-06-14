import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PUBLIC_KEY } from 'src/constants/key-decorators';
import { UsersService } from 'src/users/users.service';
import { useToken } from 'src/utilis/use.token';
import { IUseToken } from '../interface/auth.interface';
import { Observable } from 'rxjs';
import { Request } from 'express'; 

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly userService: UsersService,
    private readonly reflector: Reflector
  ){}

  async canActivate(
    context: ExecutionContext,
  ){
    const IsPublic = this.reflector.get<boolean>(
      PUBLIC_KEY,
      context.getHandler()
    );

    if(IsPublic){
      return true;
    }

    const req = context.switchToHttp().getRequest<Request>();

    const token = req.headers['biblioteca_token']
    if(!token || Array.isArray(token)){
      throw new UnauthorizedException('Token Invalido');
    }

    const manageToken: IUseToken| string = useToken(token);
    if(typeof manageToken === 'string'){
      throw new UnauthorizedException(manageToken);
    }

    if(manageToken.isExpired){
       throw new UnauthorizedException('Token expirado');
    }
    const {sub} = manageToken;
    const user = await this.userService.getUser(parseInt(sub));
    if(!user){
      throw new UnauthorizedException('Usuario no valido');
    }

    
    req.idUser = user.id.toString();
    req.rolUser = user.rol; 

    return true;
  }
}
