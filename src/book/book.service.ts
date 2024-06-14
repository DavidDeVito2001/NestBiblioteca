import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import {BookDto} from './book.dto';
import {Book} from './book.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BooksService {
    constructor(
      @InjectRepository(Book) private booksRepository: Repository<Book>,
    ){}

    async findAll(params): Promise<Book[]> {  // params se usará para filtrar, ordenar o realizar alguna operación sobre los libros antes de devolverlos.
        return await this.booksRepository.find({relations:['cliente']});
    }

    async findBook(bookId:number): Promise<Book>{
      const bookFound =  await this.booksRepository.findOne(
        {where:
            { id: bookId},
        relations:['cliente']
        });
      if(!bookFound){
        return Promise.reject(new HttpException('Book not found', HttpStatus.NOT_FOUND)); //con Promise.reject se devuelve una promesa
      }
      
      return bookFound;
    }

    createBook(newBook: BookDto): Promise<Book> {
       return this.booksRepository.save(newBook);
    }

    async deleteBook(bookId:number): Promise<any>{
      const result = await this.booksRepository.delete({id: bookId});
      if(result.affected === 0){
        return Promise.reject(new HttpException('Book not found', HttpStatus.NOT_FOUND));
      }
      return result;
    }

    async updateBook(bookId:number, newBook:BookDto): Promise<Book>{
      let toUpdate = await this.booksRepository.findOne({where:{ id: bookId}});

      if(!toUpdate){
        return Promise.reject(new HttpException('Book not found', HttpStatus.NOT_FOUND));
      }
      let update = await Object.assign(toUpdate, newBook);

      return this.booksRepository.save(update);
    }

}
