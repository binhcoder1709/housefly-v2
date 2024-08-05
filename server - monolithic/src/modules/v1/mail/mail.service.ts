import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class MailService {
  constructor(
    private readonly mailService: MailerService,
    private readonly redisService: RedisService,
  ) {}

  async sendOTPConfirmEmailService(email: string) {
    const otp = this.generateOTP();
    await this.mailService.sendMail({
      to: email,
      subject: `Your OTP Code is: ${otp}`,
      template: `<h1>
            Your OTP Code to confirm email is:${otp}
          </h1>`,
    });
    await this.redisService.set(`emailOTP-${email}`, otp, 60);
    return otp;
  }
  private generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }
}
