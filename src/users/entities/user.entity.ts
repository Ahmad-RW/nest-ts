import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";
import * as bcrypt from 'bcrypt'
import { Role } from "../../auth/entities/role.entity";
import { Permission } from "../../auth/entities/permission.entity";
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

    @ManyToMany(()=> Permission, {eager : true})
    @JoinTable({
        joinColumn :{
            name : "user_id",
            referencedColumnName : "id"
        },
        inverseJoinColumn : {
            name  : "permission_id",
            referencedColumnName : "id"
        },
        name : 'user_has_permission',
    })
    permissions : Permission[]

    @ManyToOne(()=> Role, { eager : true})
    @JoinColumn({
        name : "role_id",
        referencedColumnName : "id",
    })
    role : Role
    
    async verifyPassword(password: string) {
        return await bcrypt.compare(password, this.password);
   }

}