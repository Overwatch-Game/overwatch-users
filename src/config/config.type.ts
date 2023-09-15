export type DatabaseConfig = {
  type: string;
  host: string;
  port: number;
  username: string;
  password: string;
  database?: string;
  synchronize?: boolean;
  maxConnections?: number;
};

export type AppConfig = {
  environment: string;
  name: string;
  port: number;
  timeout: number;
  apiKey: string;
};

export type AuthConfig = {
  jwtSecret: string;
  jwtExpiresIn: string;
};
