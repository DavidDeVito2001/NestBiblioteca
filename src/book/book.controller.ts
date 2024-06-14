import { Controller, Get, Param, Query, Req, Post, Body, Delete, Put} from '@nestjs/common';
import { BooksService } from './book.service';
import { Request } from 'express';
import { BookDto } from './book.dto'
import { Book } from './book.entity'

@Controller('books')
export class BooksController {
    constructor(private bookService: BooksService){}

    @Get()
    findAll(@Req() request: Request): Promise<Book[]> {
        console.log(request.query);
        return this.bookService.findAll(request.query)
    }

    @Get(':bookId')
    findBook(@Param('bookId') bookId: number): Promise<Book>{
        return this.bookService.findBook(bookId);
    }

    @Post()
    createBook(@Body() newBook: BookDto): Promise<Book>{
        return this.bookService.createBook(newBook);
    }

    @Delete(':bookId')
    deleteBook(@Param('bookId') bookId: number): Promise<Book>{
        return this.bookService.deleteBook(bookId);
    }
    
    @Put(':bookId')
    updateBook(@Param('bookId') bookId: number, @Body() newBook: BookDto): Promise<Book> {
        return this.bookService.updateBook(bookId, newBook);
      }

}

    