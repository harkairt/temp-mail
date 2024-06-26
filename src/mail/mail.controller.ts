import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import Mailjs from '@cemalgnlts/mailjs';

const pinEmailSubject = 'Alles Clara Anmeldung';

@Controller('mail')
export class MailController {
  constructor() {}

  @Get(':token')
  async getLastPin(@Param('token') token: string): Promise<string> {
    try {
      const mailjs = new Mailjs();
      const result = await mailjs.loginWithToken(token);
      if (!result.status) {
        return JSON.stringify(result);
      }

      const messages = await mailjs.getMessages();
      if (!messages.status) {
        return JSON.stringify(messages);
      }
      if (messages.data.length === 0) {
        return `Inbox is empty`;
      }

      const message = messages.data.filter(
        (message: any) => message.subject === pinEmailSubject,
      )[0];
      if (!message) {
        return `No message found of subject "${pinEmailSubject}"`;
      }

      const fullMessage = await mailjs.getMessage(message.id);
      if (!fullMessage.status) {
        return JSON.stringify(fullMessage);
      }
      const text = fullMessage.data.text;
      const matches = text.match(/\d{6}/g);
      if (matches) {
        return JSON.stringify(matches[0]);
      } else {
        return JSON.stringify({ error: 'No 6-digit pin found!', text });
      }
    } catch (error) {
      return JSON.stringify({ error });
    }
  }
}
