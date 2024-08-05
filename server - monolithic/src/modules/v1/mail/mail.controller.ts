import { Controller, Get, Param, Post } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('/v1/mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('/:email/confirm')
  async sendOTPConfirmEmailController(@Param('email') email: string) {
    return await this.mailService.sendOTPConfirmEmailService(email);
  }
}
