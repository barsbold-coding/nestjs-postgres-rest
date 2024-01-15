import { DataTypes } from 'sequelize';
import {
  BeforeSave,
  Column,
  DefaultScope,
  Model,
  Scopes,
  Table,
} from 'sequelize-typescript';
import * as bcrypt from 'bcrypt';

@DefaultScope(() => ({
  attributes: {
    exclude: ['password'],
  },
}))
@Scopes({
  authService: {
    attributes: ['id', 'phoneNumber', 'password'],
  },
})
@Table({
  tableName: 'User',
})
export class User extends Model {
  @Column({
    type: DataTypes.ARRAY(DataTypes.STRING),
  })
  role: string[];

  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column
  phoneNumber: string;

  @Column
  password: string;

  @BeforeSave
  static async hashPassword(user: User) {
    if (user.changed('password')) {
      user.password = await bcrypt.hash(
        user.password,
        await bcrypt.genSalt(10),
      );
    }
  }
}
