import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe} from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  require('dotenv').config();
  const reflector = app.get(Reflector); //Con esto podemos utilizar para esconder la passwords en nuestras consultas a la bd
  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector))
  app.useGlobalPipes(new ValidationPipe());


  await app.listen(3000);
}
bootstrap();
