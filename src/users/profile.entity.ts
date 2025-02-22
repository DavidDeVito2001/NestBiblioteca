import { PrimaryGeneratedColumn, Column, Entity} from "typeorm";

@Entity({name: 'user_profile'})
export class Profile{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column()
    age: number;
    
}