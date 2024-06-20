import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { HelloController } from './hello/hello.controller.js';
import { MailController } from './mail/mail.controller.js';

@Module({
  imports: [],
  controllers: [AppController, HelloController, MailController],
  providers: [AppService],
})
export class AppModule {}
