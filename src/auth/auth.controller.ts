import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import Mailjs from '@cemalgnlts/mailjs';
import { DeleteBody } from './delete-payload.js';

@Controller('auth')
export class AuthController {
  @Post('/register')
  async getEmailAndToken(): Promise<string> {
    const mailjs = new Mailjs();
    const account = await mailjs.createOneAccount();
    if (!account.status) {
      return JSON.stringify(account);
    }
    const token = (mailjs as any).token;
    return JSON.stringify({ token, email: account.data.username });
  }

  @Delete('/token')
  async deleteToken(@Body() { token }: DeleteBody): Promise<string> {
    const mailjs = new Mailjs();
    await mailjs.loginWithToken(token);
    const deleteResult = await mailjs.deleteMe();
    return JSON.stringify(deleteResult);
  }
}
