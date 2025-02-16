import { Controller, Get } from '@nestjs/common';
import { RubusCodeSettingService } from '../services/rubuscode.setting.service';

@Controller()
export class RubusCodeSettingController {
  constructor(private readonly rubusCodeSettingService: RubusCodeSettingService) {}

  @Get("rubuscodesetting")
  getSetting(): SettingsResponse {
    return this.rubusCodeSettingService.getSetting();
  }
}
