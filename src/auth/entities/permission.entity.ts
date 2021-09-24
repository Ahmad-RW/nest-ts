
import { BaseEntity, Column, Entity, JoinTable, ManyToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn, DeleteDateColumn, CreateDateColumn } from "typeorm";
import { Permissions } from "../enums/permission.enum";


@Entity({name : "permissions"})
export class Permission extends BaseEntity{
    @PrimaryColumn()
    id : number

    @Column()
    name : Permissions

    @UpdateDateColumn()
    updatedAt: Date

    @DeleteDateColumn()
    deletedAt: Date

    @CreateDateColumn()
    createdAt: Date
}