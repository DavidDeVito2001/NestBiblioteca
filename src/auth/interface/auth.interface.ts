import { ROLES } from "src/constants/roles";

export interface PayloadToken{
    sub: string;
    rol: ROLES;
}

export interface AuthBody{
    username:string;
    password:string;
}

export interface AuthTokenResult {
    rol: string;
    sub: string;
    iat: number;
    exp: number;
}

export interface IUseToken {
    rol: string;
    sub: string;
    isExpired: boolean;
}
