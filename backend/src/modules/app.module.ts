import { Module } from '@nestjs/common';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { ModelController } from '../controllers/model.controller';
import { ModelSettingService } from '../services/model/model.setting.service';
import { ProjectController } from '../controllers/project.controller';
import { ProjectParserService } from '../services/project/project-parser.service';
import { ProjectTreeService } from '../services/project/project-tree.service';
import { ProjectValidatorService } from '../services/project/project-validator.service';

@Module({
  imports: [],
  controllers: [AppController, ModelController, ProjectController],
  providers: [
    AppService, 
    ModelSettingService,
    ProjectParserService, ProjectTreeService, ProjectValidatorService 
  ],
})
export class AppModule {}
