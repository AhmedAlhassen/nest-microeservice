import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repositorty';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) {}

  createUser(createUserDto: CreateUserDto) {
    return this.userRepository.create(createUserDto);
  }
}
