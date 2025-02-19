import { Controller, Get } from '@nestjs/common';
import { ModelSettingService } from '../services/model/model.setting.service';

@Controller()
export class ModelController {
  constructor(private readonly modelSettingService: ModelSettingService) {}

  @Get("getmodelsetting")
  getSetting(): SettingsModelResponse {
    return this.modelSettingService.getSetting();
  }
}
