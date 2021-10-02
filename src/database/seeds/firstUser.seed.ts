import { Factory, Seeder } from 'typeorm-seeding'
import { Connection } from 'typeorm'
import { User } from '../../users/entities/user.entity'
 import * as bcrypt from 'bcrypt'
import { Role } from '../../auth/entities/role.entity'
import { RoleId } from '../../auth/enums/role.enum'
export default class FirstUserSeed implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    // await factory(User)().create()
    const user = new User()
    user.email = 'test@test.com'
    user.salt = bcrypt.genSaltSync(10)
    user.password = bcrypt.hashSync('111', user.salt)
    user.role = await Role.findOne({id : RoleId.admin})
    console.log(await Role.findOne({id : RoleId.admin}));
    
    await user.save()
  }
}