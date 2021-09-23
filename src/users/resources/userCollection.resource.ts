import { Expose } from "class-transformer";
import { User } from "../entities/user.entity";
import { UserResource } from "./User.resource";
export class UserCollection{
   users : UserResource[]
    constructor (user : User[]){
        this.users =  user.map(elem =>{ 
          return new UserResource(elem);
        })
        
    }   
     
}