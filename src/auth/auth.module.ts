import { Global, Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';


@Global() //Se exporta globalmente
@Module({
  imports: [UsersModule],
  providers: [AuthService, UsersService],
  controllers: [AuthController]
})
export class AuthModule {}
