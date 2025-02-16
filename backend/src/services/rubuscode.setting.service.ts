import { Injectable } from '@nestjs/common';

@Injectable()
export class RubusCodeSettingService {
  getSetting(): SettingsResponse {
    const isLocalModel = process.env.LOCAL_MODEL === 'true';

    return {
      Backend: {
        port: parseInt(process.env.BACKEND_PORT || '3000', 10),
        url: `localhost:${process.env.BACKEND_PORT || '3000'}`,
      },
      Frontend: {
        environment: process.env.NODE_ENV_FRONTEND || 'development',
      },
      postgresql: {
        user: process.env.POSTGRES_USER,
        data_base: process.env.POSTGRES_DB,
        port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
      },
      admirer: {
        port: parseInt(process.env.ADMIRER_PORT || '8080', 10),
      },
      vector_data_base: {
        type: process.env.VECTOR_DB_TYPE,
        port: parseInt(process.env.VECTOR_DB_PORT || '8000', 10),
      },
      portainer: {
        port: parseInt(process.env.PORTAINER_PORT || '9000', 10),
      },
      model: isLocalModel
        ? {
            type: "local",
            name: process.env.LOCAL_MODEL_NAME,
            ollama_port: parseInt(process.env.OLLAMA_PORT || '11434', 10),
            api_url: process.env.OLLAMA_API_URL,
          }
        : {
            type: "distant",
            name: process.env.DISTANT_MODEL_NAME,
            url: process.env.DISTANT_MODEL_URL,
          },
    };
  }
}
