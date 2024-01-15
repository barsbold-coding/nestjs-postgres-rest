import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/sequelize';
import { User } from 'models/user.entity';
import { UserService } from './user.service';
import { QueryDto } from 'globals/dto/query.dto';
import { UserDto } from './user.dto';
import { Model, ModelCtor } from 'sequelize-typescript';
import { GroupedCountResultItem } from 'sequelize';

describe('UserService', () => {
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken(User),
          useValue: {
            findAndCountAll: jest.fn(),
            scope: jest.fn(() => ({
              findOne: jest.fn(),
            })),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  describe('findAll', () => {
    it('should return an array of users with count', async () => {
      const query: QueryDto = { page: 1, limit: 10 }; // Add relevant query parameters
      const expectedResult = {
        rows: [] as Model<any, any>[],
        count: 0 as unknown as GroupedCountResultItem[],
      }; // Add expected result

      jest
        .spyOn(userService['userRepository'], 'findAndCountAll')
        .mockResolvedValueOnce(expectedResult);

      const result = await userService.findAll(query);

      expect(result).toEqual(expectedResult);
    });
  });

  describe('findOneByNumber', () => {
    it('should return a user based on phone number', async () => {
      const phoneNumber = '99509101'; // Add a valid phone number
      const expectedResult = {
        phoneNumber: '99509101',
        password: 'secret_hashed_password',
        id: '1',
      }; // Add expected result

      jest.spyOn(userService['userRepository'], 'scope').mockReturnValueOnce({
        findOne: jest.fn().mockResolvedValueOnce(expectedResult),
      } as unknown as ModelCtor<Model<any, any>>);

      const result = await userService.findOneByNumber(phoneNumber);

      expect(result).toEqual(expectedResult);
    });
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const userData: UserDto = {
        role: ['ADMIN'],
        firstName: 'Chantsal',
        lastName: 'Sharav',
        phoneNumber: '99509101',
        password: 'superPa$$',
      }; // Add valid user data
      const expectedResult = {}; // Add expected result

      jest
        .spyOn(userService['userRepository'], 'create')
        .mockResolvedValueOnce(expectedResult);

      const result = await userService.create(userData);

      expect(result).toEqual(expectedResult);
    });
  });
});
