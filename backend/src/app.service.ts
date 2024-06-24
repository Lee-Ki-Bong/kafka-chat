import { Injectable } from '@nestjs/common';
import { ProducerService } from './kafka/producer.service';

@Injectable()
export class AppService {
  constructor(private readonly producerService: ProducerService) {}
  async getHello() {
    await this.producerService.produce({
      topic: 'dhkehd2-test-topic',
      messages: [
        {
          value: 'dhkehd2 Hello World!',
        },
      ],
    });
    return 'Hello World!';
  }
}
