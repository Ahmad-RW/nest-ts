import { EntityRepository, Property, Repository } from '@mikro-orm/core';
import { User } from './entities/user.entity';

@Repository(User)
export class UserRepository extends EntityRepository<User> {
  getUserByEmail(email: string): Promise<User> {
    return this.findOne({email})
  }
}
