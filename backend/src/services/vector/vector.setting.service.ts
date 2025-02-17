import { Injectable } from '@nestjs/common';

@Injectable()
export class RubusCodeModelSettingService {
  getSetting(): SettingsVectorResponse {

    return {
      vector_data_base: {
        type: process.env.VECTOR_DB_TYPE,
        port: parseInt(process.env.VECTOR_DB_PORT || '8000', 10),
      }
    };
  }
}
