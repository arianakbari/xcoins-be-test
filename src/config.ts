import dotenv from "dotenv";

dotenv.config();

export interface IMongoDbConfig {
  hostname: string;
    databaseName: string;
    userName: string;
    password: string;
    replicaSet: string;
}

export interface IConfig {
  port: number;
  debugMode: boolean;
  mongodb: IMongoDbConfig;
  corsOrigins: string[];
}

const checkEnv = (envVar: string, defaultValue?: any) => {
  if (process.env[envVar] === undefined) {
      if (defaultValue !== undefined) {
          return defaultValue;
      }
      throw new Error(`Please define the Environment variable"${envVar}"`);
  } else {
      return process.env[envVar] as string;
  }
};
const config: IConfig = {
  debugMode: checkEnv("NODE_ENV", 'development') === 'development',
  port: parseInt(checkEnv("PORT", 3000), 10),
  mongodb: {
      hostname: checkEnv('MONGODB_HOST_NAME'),
      databaseName: checkEnv('MONGODB_DATABASE_NAME'),
      userName: checkEnv('MONGODB_USER_NAME'),
      password: checkEnv('MONGODB_PASSWORD'),
      replicaSet: checkEnv('MONGODB_REPLICA_SET'),
  },
  corsOrigins: (checkEnv('CORS_ORIGINS', "http://localhost:3000")).split(','),
}

export default config;