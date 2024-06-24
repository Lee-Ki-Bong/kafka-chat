import {
  Injectable,
  OnApplicationShutdown,
  OnModuleInit,
} from '@nestjs/common';
import { Kafka, Producer, ProducerRecord } from 'kafkajs';

@Injectable()
export class ProducerService implements OnModuleInit, OnApplicationShutdown {
  private readonly kafka = new Kafka({
    brokers: ['kafka1:9092'],
  });

  private readonly producer: Producer = this.kafka.producer();

  async onModuleInit() {
    console.log('ProducerService:onModuleInit()');
    await this.producer.connect();
  }

  async produce(recode: ProducerRecord) {
    await this.producer.send(recode);
  }

  async onApplicationShutdown() {
    console.log('ProducerService:onApplicationShutdown()');
    await this.producer.disconnect();
  }
}
