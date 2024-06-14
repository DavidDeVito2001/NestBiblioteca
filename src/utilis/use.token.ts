import { AuthTokenResult, IUseToken } from "src/auth/interface/auth.interface";
import * as jwt from 'jsonwebtoken';

export const useToken = (token:string):IUseToken | string =>{
    try {
        const decode = jwt.decode(token) as AuthTokenResult
        const currenDate = new Date();
        const expiresDate = new Date(decode.exp);


        return{
            sub: decode.sub,
            rol: decode.rol,
            isExpired: +expiresDate <= +currenDate / 1000 //Si esta expirado
        }
    } catch (error) {
        return 'Token Invalido'
    }
}