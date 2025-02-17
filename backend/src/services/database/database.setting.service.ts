import { Injectable } from '@nestjs/common';

@Injectable()
export class RubusCodeModelSettingService {
  getSetting(): SettingsDatabaseResponse {

    return {
      postgresql: {
        user: process.env.POSTGRES_USER,
        data_base: process.env.POSTGRES_DB,
        port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
      },
      admirer: {
        port: parseInt(process.env.ADMIRER_PORT || '8080', 10),
      }
    };
  }
}
