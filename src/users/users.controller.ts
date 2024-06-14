import {
  Controller,
  Post,
  Body,
  Get,
  Req,
  Param,
  ParseIntPipe,
  Delete,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { CreateUserDTO } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { UpdateUserDTO } from './dto/update-user.dto';
import { CreateProfileDTO } from './dto/create-profile.dto';
import { PublicAccess } from 'src/auth/decorators/public.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('users') //ruta
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getUsers(@Req() request: Request): Promise<User[]> {//http://localhost:3000/users?order=10 <==== Req, para pasar un filtro para ordenar por ej
    console.log(request.query);
    return this.usersService.getUsers(request.query);
  }
  @PublicAccess()
  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: number): Promise<User> { // Lo que hace ParseIntPipe es convertir el id:string a id:number
    return this.usersService.getUser(id);
  }

  @Post()
  createUser(@Body() newUser: CreateUserDTO): Promise<User> {
    return this.usersService.createUser(newUser);
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return this.usersService.deleteUser(id);
  }

  @Patch(':id')
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() user: UpdateUserDTO,
  ): Promise<User> {
    return this.usersService.updateUser(id, user);
  }

  @Post(':id/profile')
  createProfile(
    @Param('id', ParseIntPipe) id:number,
    @Body() profile: CreateProfileDTO 
  ){
    return this.usersService.createProfile(id, profile);
  }
}
