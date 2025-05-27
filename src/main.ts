import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Habilitar CORS ANTES de arrancar el servidor
  app.enableCors({
    origin: '*', // Puedes cambiar a 'http://localhost:5173' si prefieres restringirlo
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
