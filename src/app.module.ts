import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { MailController } from './mail/mail.controller.js';
import { AuthController } from './auth/auth.controller.js';
import { EchoController } from './echo/echo.controller.js';

@Module({
  imports: [],
  controllers: [AppController, MailController, AuthController, EchoController],
  providers: [AppService],
})
export class AppModule {}
