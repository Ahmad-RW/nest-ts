import { Exclude } from "class-transformer";
import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";
import * as bcrypt from 'bcrypt'
@Entity({name : 'users'})
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    email: string

    @Column()
    password: string

    @Column()
    salt: string

    @UpdateDateColumn()
    updatedAt: Date

    @DeleteDateColumn()
    deletedAt: Date

    @CreateDateColumn()
    createdAt: Date

    @VersionColumn()
    version: number

    
    async verifyPassword(password: string) {
        return await bcrypt.compare(password, this.password);
   }

}