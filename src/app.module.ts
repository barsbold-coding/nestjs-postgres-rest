import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { SequelizeConfigModule } from './modules/db/sequelize.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SequelizeConfigModule,
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
