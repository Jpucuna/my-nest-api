import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

interface optionInterface {
  id: number;
  name: string;
  value: string;
}

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    try {
      if (
        !createUserDto.name ||
        !createUserDto.email ||
        !createUserDto.typeSelected
      ) {
        throw new Error('All fields are required');
      }
      const user = this.userRepository.create({
        name: createUserDto.name,
        email: createUserDto.email,
        typeSelected: createUserDto.typeSelected,
      });

      return await this.userRepository.save(user);
    } catch (error) {
      console.error('Error creating user:', error);
      throw error; // Re-throw the error to be handled by NestJS
    }
  }

  getAllOptions(): Promise<optionInterface[]> {
    return Promise.resolve([
      { id: 1, name: 'Option 1', value: 'option1' },
      { id: 2, name: 'Option 2', value: 'option2' },
      { id: 3, name: 'Option 3', value: 'option3' },
    ]);
  }
}
