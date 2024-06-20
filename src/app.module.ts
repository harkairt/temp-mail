import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HelloController } from './hello/hello.controller';
import { MailController } from './mail/mail.controller';

@Module({
  imports: [],
  controllers: [AppController, HelloController, MailController],
  providers: [AppService],
})
export class AppModule {}
