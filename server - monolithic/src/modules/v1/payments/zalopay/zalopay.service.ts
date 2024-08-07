import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as crypto from 'crypto';

@Injectable()
export class ZalopayService {
  private appId = process.env.ZALOPAY_APP_ID;
  private key1 = process.env.ZALOPAY_KEY1;
  private key2 = process.env.ZALOPAY_KEY2;
  private endpoint = process.env.ZALOPAY_ENDPOINT;

  async createPayment() {
    const embed_data = {};

    const items = [{}];
    const transID = Math.floor(Math.random() * 1000000);
    const order = {
      app_id: this.appId,
      app_trans_id: `240806_${transID}`,
      app_user: 'user123',
      app_time: Date.now(),
      item: JSON.stringify(items),
      embed_data: JSON.stringify(embed_data),
      amount: 50000,
      description: `Lazada - Payment for the order #${transID}`,
      bank_code: 'zalopayapp',
    };

    // appid|app_trans_id|appuser|amount|apptime|embeddata|item
    const data =
      this.appId +
      '|' +
      order.app_trans_id +
      '|' +
      order.app_user +
      '|' +
      order.amount +
      '|' +
      order.app_time +
      '|' +
      order.embed_data +
      '|' +
      order.item;
    const mac = crypto
      .createHmac('sha256', this.key1)
      .update(data)
      .digest('hex');

    const orderWithMac = { ...order, mac };

    try {
      const response = await axios.post(this.endpoint, null, {
        params: orderWithMac,
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to create payment');
    }
  }

  //   private generateMac(transID: string): string {
  //     const dataString = `${this.appId}|cb56e9a9-e9e7-4034-8ee0-dcfd03dbf7bb|${transID}|1000000|${Date.now()}|${this.key1}`;
  //     return crypto
  //       .createHmac('sha256', this.key2)
  //       .update(dataString)
  //       .digest('hex');
  //   }
}
