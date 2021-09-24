import { Exclude } from "class-transformer";
import { BaseEntity, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { RoleId } from "../enums/role.enum";
import { Permission } from "./permission.entity";



@Entity({name : "roles"})
export class Role extends BaseEntity{
    @PrimaryColumn()
    id : RoleId

    @Column()
    name : string
    
    
    @ManyToMany(()=>Permission, {eager : true})
    @JoinTable({    
        name : "role_has_permission",
        joinColumn : {
            name : "role_id",
            referencedColumnName : "id",
        },
        inverseJoinColumn : {
            name : "permission_id",
            referencedColumnName : "id"
        }
    })
    permissions : Permission[]
}