import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
// import './global-fetch';

import('node-fetch').then(({ default: fetch }) => {
// @ts-ignore
globalThis.fetch = fetch;
}).catch((error) => {
  console.error('Failed to import node-fetch:', error);
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3010);
}
bootstrap();
