import { Factory, Seeder } from 'typeorm-seeding'
import { Connection } from 'typeorm'
import { User } from '../../users/entities/user.entity'
 
export default class FirstUserSeed implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await factory(User)().create()
  }
}