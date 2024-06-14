import { User } from "src/users/user.entity";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";

@Entity('books')
export class Book{
    @PrimaryGeneratedColumn() //Indica que es una clave primaria autonumérica
    id: number;

    @Column()
    title: string;

    @Column()
    genre: string;

    @Column('text')
    description: string;

    @Column()
    author: string;

    @Column()
    publisher: string;

    @Column()
    pages:number;

    @Column()
    image_url: string;

    @Column()
    clienteId:number;

    @ManyToOne(()=> User, user => user.book)
    cliente: User;
    
}