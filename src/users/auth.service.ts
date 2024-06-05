import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from './users.entity';
import { UsersDbService } from './usersDb.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Role } from '../roles.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersDbService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(user: Omit<User, 'id'>) {
    const dbUser = await this.usersService.getUserByEmail(user.email);
    if (dbUser) {
      throw new BadRequestException('Email already in use');
    }
    const hashedPassword = await bcrypt.hash(user.password, 10);
    if (!hashedPassword) {
      throw new BadRequestException('password could not be hashed');
    }
    return this.usersService.saveUser({ ...user, password: hashedPassword });
  }

  async signIn(email: string, password: string) {
    const dbUser = await this.usersService.getUserByEmail(email);
    if (!dbUser) {
      throw new BadRequestException('User not found');
    }
    const isPasswordValid = await bcrypt.compare(password, dbUser.password);
    if (!isPasswordValid) {
      throw new BadRequestException('Invalid Password');
    }

    const userPayload = {
      sub: dbUser.id,
      id: dbUser.id,
      email: dbUser.email,
      // isAdmin: dbUser.isAdmin,
      roles: [dbUser.isAdmin ? Role.Admin : Role.User],
    };

    const token = this.jwtService.sign(userPayload);

    return { success: 'User logged in successfully', token };
  }
}
