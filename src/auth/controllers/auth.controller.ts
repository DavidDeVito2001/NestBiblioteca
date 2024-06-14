import { Body, Controller, HttpException,HttpStatus, Post } from '@nestjs/common';
import { AuthBody } from '../interface/auth.interface';
import { AuthService } from '../services/auth.service';
import { AuthDTO } from '../dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  async login(@Body() { username, password }: AuthDTO) {
    const userValidate = await this.authService.validateUser(
      username,
      password,
    );

    if(!userValidate){
        return new HttpException('Data no valida',HttpStatus.CONFLICT); 
    }

    const jwt  = await this.authService.generateJWT(userValidate);

    return jwt;
  }
}
