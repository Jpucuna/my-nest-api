import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as fs from 'fs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    //save in a txt file the user data in download folder
    const downloadPath = './downloads'; // Ensure this path exists
    if (!fs.existsSync(downloadPath)) {
      fs.mkdirSync(downloadPath);
    }
    // Append user data to a file named 'users.txt' in the downloads folder
    const filePath = `${downloadPath}/users.txt`;
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, '');
    }
    // Append user data to the file
    fs.appendFileSync('users.txt', JSON.stringify(user));
    //save in the database
    return this.userRepository.save(user);
  }
}
