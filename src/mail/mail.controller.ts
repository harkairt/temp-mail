import { Controller, Get, Query } from '@nestjs/common';
import Mailjs from '@cemalgnlts/mailjs';

// {"username":"o0n61@navalcadets.com","password":"r52ydd7u"}

@Controller('mail')
export class MailController {
  @Get()
  async getMail(@Query() query: any): Promise<string> {
    const mailjs = new Mailjs();
    await mailjs.login(query.email, query.password);
    const messages = await mailjs.getMessages();
    return `${JSON.stringify(messages)}`;

    // mailjs.on('arrive', (message) => {

    // });

    return `${JSON.stringify(query)}`;
  }
}
