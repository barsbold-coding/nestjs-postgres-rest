import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { SequelizeConfigService } from './sequelize.service';

export const SequelizeConfigModule = SequelizeModule.forRootAsync({
  imports: [ConfigModule],
  useClass: SequelizeConfigService,
});
