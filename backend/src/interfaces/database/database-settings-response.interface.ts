interface SettingsDatabaseResponse {
    postgresql: {
      user: string | undefined;
      data_base: string | undefined;
      port: number;
    };
    admirer: {
      port: number;
    };
  }
