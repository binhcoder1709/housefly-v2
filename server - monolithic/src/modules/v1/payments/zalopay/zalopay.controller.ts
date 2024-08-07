import { Controller, Post } from '@nestjs/common';
import { ZalopayService } from './zalopay.service';

@Controller('/v1/payment/zalopay')
export class ZalopayController {
  constructor(private readonly zalopayService: ZalopayService) {}

  @Post()
  async createPaymentController() {
    return await this.zalopayService.createPayment();
  }
}
