import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { CreateProfileDTO } from './dto/create-profile.dto';
import { Profile } from './profile.entity'

require('dotenv').config();

@Injectable()
export class UsersService { 
  constructor(
    // Importamos nuestra clase Usuario y la convertimos en un Repositorio de TypeOrm
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
  ) {} 
  //params se usa por si se quiere ordenar de alguna forma sin afectar los datos de forma absoluta
  public async getUsers(params:any): Promise<User[]> {
    return await this.userRepository.find();
  }

  public async getUser(id: number): Promise<User> {
    const userFound = await this.userRepository.findOne({
      where: {
        id
      },
      relations: ['profile','book']
    });

    if (!userFound) {
      return Promise.reject(
        new HttpException('User No Existe', HttpStatus.NOT_FOUND),
      );
    }

    return userFound;
  }

  public async createUser(user: CreateUserDTO): Promise<User> {
  
    user.password = await bcrypt.hash(user.password, 10);  
    
    const userFound = await this.userRepository.findOne({
      where: {
        username: user.username,
      },
    });

    if (userFound) {
        //Retorna el error en forma de promesa
      return Promise.reject(
        new HttpException('User Ya Existe', HttpStatus.CONFLICT),
      ); 
    }

    return await this.userRepository.save(user);
  }

  public async findBy({key, value}:{key: string, value:any}): Promise<User | undefined>{
    const user: User = await this.userRepository
    .createQueryBuilder('user')
    .addSelect('user.password')
    .where({[key]:value})
    .getOne();

    return user;
  }


  public async deleteUser(id: number) {
    const eliminado = await this.userRepository.delete({ id });
    if (eliminado.affected === 0) {
      return Promise.reject(
        new HttpException('User No Existe', HttpStatus.NOT_FOUND),
      );
    }
    return eliminado;
  }

  public async updateUser(id: number, user: UpdateUserDTO) {
    const userFound = await this.userRepository.findOne({
      where: {
        id,
      },
    });

    if (!userFound) {
      return Promise.reject(
        new HttpException('User No Existe', HttpStatus.NOT_FOUND),
      );
    }

    const userUpdate = Object.assign(userFound, user);
    return await this.userRepository.save(userUpdate);
  }

  public async createProfile(id:number, profile: CreateProfileDTO){
    const userFound = await this.userRepository.findOne({
      where:{
        id
      }
    });

    if(!userFound){
      return Promise.reject(new HttpException('User No Existe', HttpStatus.NOT_FOUND));
    }
    if(userFound.profileId){
      return Promise.reject(new HttpException('Ya existe un perfil para este usuario', HttpStatus.NOT_ACCEPTABLE));
    }

    const newProfile = this.profileRepository.create(profile);
    const savedProfile = await this.profileRepository.save(newProfile);
    
    userFound.profile = savedProfile
    
    return this.userRepository.save(userFound)

  }
}
