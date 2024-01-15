import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from 'models/user.entity';
import { getModelToken } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;
  let moduleRef: TestingModule;
  const mockUser = {};

  beforeEach(async () => {
    jest.mock('@nestjs/jwt');
    jest.mock('@nestjs/config');
    moduleRef = await Test.createTestingModule({
      imports: [JwtModule, ConfigModule],
      providers: [
        UserService,
        { provide: getModelToken(User), useValue: mockUser },
      ],
      controllers: [UserController],
    }).compile();
    userController = await moduleRef.resolve(UserController);
    userService = await moduleRef.resolve(UserService);
  });

  describe('create', () => {
    it('creates new user', async () => {
      const result = Promise.resolve({
        count: 12,
        rows: [
          {
            firstName: 'Chantsal',
            lastName: 'Sharaw',
            phoneNumber: '99509101',
            role: ['ADMIN'],
          },
        ] as User[],
      });
      jest.spyOn(userService, 'findAll').mockImplementation(() => result);
      expect(userController.findAll({})).toStrictEqual(result);
    });
  });
});
