import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany } from "typeorm";
import {Exclude } from 'class-transformer'
import { Profile } from "./profile.entity";
import { Book } from "src/book/book.entity";
import { ROLES } from "src/constants/roles";


@Entity({name: 'users'}) //Esto hace que Mysql se cree la tabla con el nombre 'users'
export class User{

    @PrimaryGeneratedColumn() 
    id:number;

    @Column({unique:true}) //El userName no puede repetirse, es único de cada usuario
    username: string;

    @Column({unique:true}) //El userName no puede repetirse, es único de cada usuario
    email: string;

    @Exclude()//de esta forma escondemos la contraseña en las búsquedas de Bd
    @Column()
    password: string;

    @Column({type: 'datetime', default: ()=> 'CURRENT_TIMESTAMP'}) //Del tipo datetime y que se coloque la fecha actual de la creación
    createdAt: Date;

    @Column({type: 'enum', enum:ROLES,  nullable:true})
    rol: ROLES;

    @Column({nullable:true}) //nulleable:true, hace que esta columna sea opcional
    authStrategy:string;

    @OneToOne(()=> Profile)
    @JoinColumn()
    profile:Profile;

    @Column({ nullable: true })
    profileId: number;

    @OneToMany(()=>Book, book=> book.cliente)
    book: Book[];

}