import { Factory, Seeder } from 'typeorm-seeding';
import { User } from '../../users/entities/user.entity';
import * as bcrypt from 'bcrypt'
import { RoleId } from '../../auth/enums/role.enum';
import { Role } from '../../auth/entities/role.entity';
export default class AdminSeeder implements Seeder {
  public async run(): Promise<any> {
    const user = new User()
    user.email = 'test@test.com'
    user.salt = bcrypt.genSaltSync(10)
    user.password = bcrypt.hashSync('111', user.salt)
    user.role = await Role.findOne({id : RoleId.admin})
    
    await user.save()
  }
}
