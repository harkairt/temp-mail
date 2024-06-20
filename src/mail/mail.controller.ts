import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import Mailjs from '@cemalgnlts/mailjs';
import { InMemoryStorageService } from '../utils/in-memory-storage-service.js';
import { DeleteBody } from './delete-payload.js';

const pinEmailSubject = "Alles Clara Anmeldung";

@Controller('mail')
export class MailController {
  constructor(private readonly storageService: InMemoryStorageService) {}

  @Post()
  async getToken(): Promise<string> {
    const mailjs = new Mailjs();
    const account = await mailjs.createOneAccount();
    const token = (mailjs as any).token;
    return JSON.stringify({ token, email: account.data.username });
  }

  @Get(':token')
  async getLastPin(@Param('token') token: string): Promise<string> {
    const mailjs = new Mailjs();
    await mailjs.loginWithToken(token);
    const messages = await mailjs.getMessages();
    const message = messages.data.filter(
      (message: any) => message.subject === pinEmailSubject,
    )[0];
    if (!message) {
      return `No message found of subject "${pinEmailSubject}"`;
    }

    const text = (await mailjs.getMessage(message.id)).data.text;
    const matches = text.match(/\d{6}/g);
    if (matches) {
      return JSON.stringify(matches[0]);
    } else {
      return JSON.stringify({ error: 'No 6-digit pin found!', text });
    }
  }

  @Delete()
  async deleteToken(@Body() { token }: DeleteBody): Promise<string> {
    const mailjs = new Mailjs();
    await mailjs.loginWithToken(token);
    const deleteResult = await mailjs.deleteMe();
    return JSON.stringify(deleteResult);
  }
}
