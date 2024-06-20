import { Controller, Get, Post, Query, Param, Delete } from '@nestjs/common';
import Mailjs from '@cemalgnlts/mailjs';
import { InMemoryStorageService } from '../utils/in-memory-storage-service.js';

@Controller('mail')
export class MailController {
  constructor(private readonly storageService: InMemoryStorageService) {}

  @Post()
  async getToken(): Promise<string> {
    const mailjs = new Mailjs();
    const account = await mailjs.createOneAccount();
    const token = (mailjs as any).token;
    return token;
  }

  @Get(':token')
  async getLastPin(@Param('token') token: string): Promise<string> {
    const mailjs = new Mailjs();
    await mailjs.loginWithToken(token);
    const messages = await mailjs.getMessages();
    return `${JSON.stringify(messages)}`;
  }

  @Delete(':token')
  async deleteToken(@Param('token') token: string): Promise<string> {
    const mailjs = new Mailjs();
    await mailjs.loginWithToken(token);
    const deleteResult = await mailjs.deleteMe();
    return JSON.stringify(deleteResult);
  }
}
