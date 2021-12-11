import { User } from '../entities/user.entity';
import { UserResource } from './user.resource';
export class UserCollection {
  users: UserResource[];
  constructor(user: User[]) {
    this.users = user.map((elem) => {
      return new UserResource(elem);
    });
  }
}
