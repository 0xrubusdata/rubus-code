interface SettingsModelResponse {
    model: LocalModel | DistantModel;
  }
  
  interface LocalModel {
    type: "local";
    name: string | undefined;
    ollama_port: number;
    api_url: string | undefined;
  }
  
  interface DistantModel {
    type: "distant";
    name: string | undefined;
    url: string | undefined;
  }
  