interface SettingsResponse {
    Backend: {
      port: number;
      url: string;
    };
    Frontend: {
      environment: string;
    };
    postgresql: {
      user: string | undefined;
      data_base: string | undefined;
      port: number;
    };
    admirer: {
      port: number;
    };
    vector_data_base: {
      type: string | undefined;
      port: number;
    };
    portainer: {
      port: number;
    };
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
  