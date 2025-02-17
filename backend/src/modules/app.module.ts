import { Module } from '@nestjs/common';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { ModelController } from '../controllers/model.controller';
import { ModelSettingService } from '../services/model/model.setting.service';

@Module({
  imports: [],
  controllers: [AppController, ModelController],
  providers: [AppService, ModelSettingService],
})
export class AppModule {}
