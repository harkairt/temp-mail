import { Controller, Get, Param } from '@nestjs/common';

@Controller('hello')
export class HelloController {
  @Get(':token')
  getHello(@Param('token') token: string): string {
    return 'Hello' + token;
  }
}