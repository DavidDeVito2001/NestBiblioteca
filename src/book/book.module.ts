import { Module } from '@nestjs/common';
import { Book } from './book.entity';
import { BooksService } from './book.service';
import { BooksController } from './book.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Book]), UsersModule], 
  providers: [BooksService], 
  controllers: [BooksController], 
})
export class BookModule {}