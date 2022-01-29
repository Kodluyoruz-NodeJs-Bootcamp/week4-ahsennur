import {Entity, PrimaryGeneratedColumn, Column} from "typeorm"

//User entity for database operations
@Entity()
export default class User{
    @PrimaryGeneratedColumn("uuid")
    _id: string

    @Column({ nullable: false, unique: true })
    userName: string

    @Column({ nullable: false})
    password: string

    @Column({ nullable: false})
    name: string

    @Column({ nullable: false})
    surname: string

    @Column(({ nullable: true, default: null }))
    token: string
}