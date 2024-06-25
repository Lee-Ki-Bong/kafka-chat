import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions } from 'socket.io';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS 설정 추가
  app.enableCors({
    origin: 'http://localhost:4000', // 허용할 도메인
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // WebSocket CORS 설정을 위해 IoAdapter 확장
  class CustomIoAdapter extends IoAdapter {
    createIOServer(port: number, options?: ServerOptions): any {
      const server = super.createIOServer(port, {
        ...options,
        cors: {
          origin: 'http://localhost:4000',
          methods: ['GET', 'POST'],
          credentials: true,
        },
      });
      return server;
    }
  }

  app.useWebSocketAdapter(new CustomIoAdapter(app));

  await app.listen(3000);
}
bootstrap();
