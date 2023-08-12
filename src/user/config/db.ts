import { ConfigService } from '@nestjs/config';
export function DBConfig(configService: ConfigService) {
  const mongoUri = configService.get('MONGO_URI');
  const dbName = configService.get('DB_NAME');
  console.log('mongo-uri', mongoUri);
  console.log('DB', dbName);

  return {
    uri: `${mongoUri}/${dbName}`,
  };
}
