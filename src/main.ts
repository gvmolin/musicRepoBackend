import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.APP_PORT, () =>
    console.log(`Server started on port: ${process.env.APP_PORT}`),
  );

  app.enableCors({
    origin: process.env.CORS_WHITELIST.split(','),
  });
}

bootstrap();
