import { Inject } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
export class UsersInterface {
  constructor(
    @Inject(UsersService) private readonly usersService: UsersService,
  ) {}

  async findUser(user): Promise<User> {
    return this.usersService.findUser(user);
  }
}
