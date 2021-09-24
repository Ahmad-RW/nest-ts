import { JwtModuleAsyncOptions, JwtModuleOptions } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt'
export const jwtConfig = () : JwtModuleOptions =>({
    secret : process.env.JWT_SECRET,
    signOptions : {expiresIn : '48h'}

}) 

export const dummy = () =>{
    test : 'test'
}
