import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ConsumerService } from 'src/kafka/consumer.service';
import { ProducerService } from 'src/kafka/producer.service';

@WebSocketGateway()
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly producerService: ProducerService,
    private readonly consumerService: ConsumerService,
  ) {
    this.consumeMessages();
  }

  async consumeMessages() {
    await this.consumerService.consume(
      { topics: ['chat-messages'] },
      {
        eachMessage: async ({ topic, partition, message }) => {
          const kafkaMessage = {
            value: message.value.toString(),
            topic: topic.toString(),
            partition: partition.toString(),
          }
          console.log(kafkaMessage);
          this.server.emit('message', kafkaMessage.value);
        },
      },
    );
  }

  @SubscribeMessage('message')
  async handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: { user: string; text: string },
  ) {
    const ip = client.handshake.address;
    console.log(`Client connected: ${client.id}`);
    console.log(`Client IP: ${ip}`);

    await this.producerService.produce({
      topic: 'chat-messages',
      messages: [{ value: JSON.stringify(payload) }],
    });
    this.server.emit('message', payload);
  }
}
