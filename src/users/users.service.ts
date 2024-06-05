import { Inject, Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from './user.interface';

@Injectable()
export class UsersService {
  constructor(
    private usersRepository: UsersRepository,
    @Inject('API_USERS') private apiUsers: User[],
  ) {}

  async getUsers() {
    const dbUsers = await this.usersRepository.getUsers();
    const users = [...dbUsers, ...this.apiUsers];
    return users;
  }

  getUserById(id: number) {
    return this.usersRepository.getById(id);
  }

  getUserByName(name: string) {
    return this.usersRepository.getByName(name);
  }

  createUser(user: Omit<User, 'id'>): Promise<User> {
    return this.usersRepository.createUser(user);
  }
}
