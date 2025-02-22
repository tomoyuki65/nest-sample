import { Test, TestingModule } from '@nestjs/testing';
import { SampleController } from './sample.controller';
import { SampleService } from './sample.service';
import { SampleRepository } from './sample.repo';
import { GetSampleResponse, PostSampleResponse } from './sample.dto';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('SampleController', () => {
  let originalConsoleLog: any;
  let controller: SampleController;
  let repository: SampleRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SampleService, SampleRepository],
      controllers: [SampleController],
    })
      // 外部APIの実行を想定し、モック化したいクラスがある場合
      .overrideProvider(SampleRepository)
      .useValue({
        textProcessing: jest.fn(),
      })
      .compile();

    controller = module.get<SampleController>(SampleController);
    repository = module.get<SampleRepository>(SampleRepository);

    // ログ出力のモック化
    originalConsoleLog = console.error;
    console.error = jest.fn();
  });

  afterEach(() => {
    // ログ出力のモック化解除
    console.error = originalConsoleLog;
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return GetSampleResponse', () => {
    const data: GetSampleResponse = { id: 1, text: 'sample' };
    expect(controller.getSample()).toEqual(data);
  });

  it('should return PostSampleResponse', async () => {
    const body = { text: 'abCde' };
    const data: PostSampleResponse = {
      upperText: 'ABCDE',
      lowerText: 'abcde',
      textLength: 5,
    };

    // モックの戻り値を設定
    (repository.textProcessing as jest.Mock).mockReturnValue({ data: data });

    const res = await controller.postSample(body);

    expect(res).toEqual(data);
  });

  it('should throw error', async () => {
    const body = { text: 'abCde' };

    // モックの戻り値を設定
    const error = new HttpException(
      'Internal Server Error',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
    (repository.textProcessing as jest.Mock).mockRejectedValue(error);

    try {
      await controller.postSample(body);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpException);
      expect(error.message).toBe('Internal Server Error');
      expect(error.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  });
});
