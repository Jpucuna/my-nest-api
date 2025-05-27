/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

interface optionInterface {
  id: number;
  name: string;
  value: string;
}

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  // Define your endpoints here, e.g.:

  @Get()
  getAllOptions(): Promise<optionInterface[]> {
    try {
      return this.usersService.getAllOptions();
    } catch (error) {
      console.error('Error fetching options:', error);
      throw error; // Re-throw the error to be handled by NestJS
    }
  }

  @Post('create')
  async createUser(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.usersService.createUser(createUserDto);
    } catch (error) {
      console.error('Error creating user:', error);
      throw error; // Re-throw the error to be handled by NestJS
    }
  }
}
