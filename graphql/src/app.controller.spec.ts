import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

describe('AppController', () => {
  let appController: AppController;
  let configService: ConfigService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({ isGlobal: true })],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
    configService = app.get<ConfigService>(ConfigService);
  });

  describe('root', () => {
    it('should return text', () => {
      const port = configService.get<number>('PORT');
      const nodeEnv = 'test'; // テスト実行時はNODE_ENVがtestになる
      const env = configService.get<string>('ENV');

      expect(appController.getHello()).toBe(
        `Hello World !! [PORT: ${port}, NODE_ENV: ${nodeEnv}, ENV: ${env}]`,
      );
    });
  });
});
