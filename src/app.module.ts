import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { HelloController } from './hello/hello.controller.js';
import { MailController } from './mail/mail.controller.js';
import { InMemoryStorageService } from './utils/in-memory-storage-service.js';

@Module({
  imports: [],
  controllers: [AppController, HelloController, MailController],
  providers: [AppService, InMemoryStorageService],
})
export class AppModule {}
