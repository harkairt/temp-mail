import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';

@Controller('echo')
export class EchoController {
  @Get()
  echo(@Query() query: any): any {
    return query;
  }
}
