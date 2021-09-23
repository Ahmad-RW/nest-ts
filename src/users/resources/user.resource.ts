//need to work on a better way to represent resources in our system
import { User } from "../entities/user.entity";
export class UserResource{
    email : string
    id : number
    version : number
    constructor (user : User){
        this.email = user.email
        this.id = user.id
        this.version = user.version
    }   
     
}