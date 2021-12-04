import * as Faker from 'faker';
import { define } from 'typeorm-seeding';
import { User } from '../../users/entities/user.entity';
import * as bcrypt from 'bcrypt';

define(User, (faker: typeof Faker) => {
  const user = new User();
  user.email = faker.internet.email();
  user.salt = bcrypt.genSaltSync(10);
  user.password = bcrypt.hashSync('111', user.salt);
  return user;
});
