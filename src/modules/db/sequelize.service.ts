import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  SequelizeModuleOptions,
  SequelizeOptionsFactory,
} from '@nestjs/sequelize';

@Injectable()
export class SequelizeConfigService implements SequelizeOptionsFactory {
  constructor(private configService: ConfigService) {}

  createSequelizeOptions(): SequelizeModuleOptions {
    return {
      dialect: 'postgres',
      host: this.configService.get('DB_HOST'),
      port: this.configService.get('DB_PORT'),
      database: this.configService.get('DB_NAME'),
      username: this.configService.get('DB_USER'),
      password: this.configService.get('DB_PASSWORD'),
      autoLoadModels: true,
      synchronize: false,
    };
  }
}
