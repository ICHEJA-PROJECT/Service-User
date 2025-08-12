import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { envsValues } from './core/config/getEnvs';
import { USER_SERVICE_OPTIONS } from './shared/constants/user_service_options';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Service-User');
  try {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
      AppModule, 
      {
        transport: Transport.RMQ,
        options: {
          urls: envsValues.BROKER_HOSTS,
          queue: USER_SERVICE_OPTIONS.USER_QUEUE,
          queueOptions: {
            durable: true,
          },
        },
      },
    );
    await app.listen();
    logger.log('User microservice is running...');
  } catch (error) {
    logger.error('Error starting Exercise microservice', error);
  }
}
bootstrap();
