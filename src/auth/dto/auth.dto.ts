import { IsNotEmpty, IsString } from "class-validator";
import { AuthBody } from "../interface/auth.interface";

export class AuthDTO implements AuthBody{
    
    @IsNotEmpty()
    username: string;
    
    @IsString()
    @IsNotEmpty()
    password: string;
}