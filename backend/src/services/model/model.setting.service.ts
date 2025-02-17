import { Injectable } from '@nestjs/common';

@Injectable()
export class ModelSettingService {
  getSetting(): SettingsModelResponse {
    const isLocalModel = process.env.LOCAL_MODEL === 'true';

    return {
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
