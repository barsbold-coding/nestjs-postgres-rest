import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { QueryDto } from '../../globals/dto/query.dto';
import { User } from 'models/user.entity';
import { paginate } from 'utilities/pagination';
import { UserDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async findAll(query: QueryDto) {
    return await this.userRepository.findAndCountAll({
      ...paginate(query),
    });
  }

  async findOneByNumber(phoneNumber: string) {
    return await this.userRepository
      .scope('authService')
      .findOne({ where: { phoneNumber } });
  }

  async create(data: UserDto) {
    return await this.userRepository.create(
      { ...data },
      {
        returning: [
          'id',
          'firstName',
          'lastName',
          'phoneNumber',
          'updatedAt',
          'createdAt',
        ],
      },
    );
  }
}
