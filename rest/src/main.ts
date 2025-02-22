import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as fs from 'fs-extra';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') ?? 3000;
  const nodeEnv = configService.get<string>('NODE_ENV') ?? 'development';

  // 開発環境のみOpenAPIを有効化
  if (nodeEnv != 'production') {
    const config = new DocumentBuilder()
      .setTitle('SampleのAPI仕様書')
      .setDescription('Nest.jsで作成したAPIの仕様書です。')
      .setVersion('1.0')
      .build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('api', app, documentFactory);

    // OpenAPIのJSONファイルを出力
    const outputFilePath = './openapi/openapi.json';
    await fs.writeFile(
      outputFilePath,
      JSON.stringify(documentFactory(), null, 2),
    );
  }

  await app.listen(port);
}
void bootstrap();
