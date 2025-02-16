import { Module } from '@nestjs/common';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { RubusCodeSettingController } from '../controllers/rubuscode.setting.controller';
import { RubusCodeSettingService } from '../services/rubuscode.setting.service';

@Module({
  imports: [],
  controllers: [AppController, RubusCodeSettingController],
  providers: [AppService, RubusCodeSettingService],
})
export class AppModule {}
