import { Test, TestingModule } from '@nestjs/testing';
import { SampleResolver } from './sample.resolver';
import { SampleService } from './sample.service';
import { AppModule } from '../app.module';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

describe('SampleResolver', () => {
  let resolver: SampleResolver;
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [SampleResolver, SampleService],
    }).compile();

    app = module.createNestApplication();
    await app.init();
    resolver = module.get<SampleResolver>(SampleResolver);
  });

  // 全テスト終了後の処理
  afterAll(async () => {
    await app.close();
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should return getSample all data', async () => {
    const query = `
      query TestGetSampleQuery {
        getSample {
          id
          title
          description
          createdAt
          updatedAt
          deletedAt
        }
      }
    `;

    const res = await request(app.getHttpServer())
      .post('/graphql')
      .send({ query });

    expect(res.body.data.getSample).toBeDefined();
    expect(res.body.data.getSample).toBeInstanceOf(Array);
    expect(res.body.data.getSample.length).toBeGreaterThan(0);
    // 1件目のデータを確認
    expect(res.body.data.getSample[0].id).toBe(1);
    expect(res.body.data.getSample[0].title).toBe('タイトル1');
    expect(res.body.data.getSample[0].description).toBe('説明1');
    expect(res.body.data.getSample[0].createdAt).toBeDefined();
    expect(res.body.data.getSample[0].updatedAt).toBeDefined();
    expect(res.body.data.getSample[0].deletedAt).toBeNull();
    // 2件目のデータを確認
    expect(res.body.data.getSample[1].id).toBe(2);
    expect(res.body.data.getSample[1].title).toBe('タイトル2');
    expect(res.body.data.getSample[1].description).toBe('説明2');
    expect(res.body.data.getSample[1].createdAt).toBeDefined();
    expect(res.body.data.getSample[1].updatedAt).toBeDefined();
    expect(res.body.data.getSample[1].deletedAt).toBeNull();
  });

  it('should return getSample selection field', async () => {
    const query = `
      query TestGetSampleQuery {
        getSample {
          id
          title
          description
        }
      }
    `;

    const res = await request(app.getHttpServer())
      .post('/graphql')
      .send({ query });

    expect(res.body.data.getSample).toBeDefined();
    expect(res.body.data.getSample).toBeInstanceOf(Array);
    expect(res.body.data.getSample.length).toBeGreaterThan(0);
    // 1件目のデータを確認
    expect(res.body.data.getSample[0].id).toBe(1);
    expect(res.body.data.getSample[0].title).toBe('タイトル1');
    expect(res.body.data.getSample[0].description).toBe('説明1');
    expect(res.body.data.getSample[0].createdAt).toBeUndefined();
    expect(res.body.data.getSample[0].updatedAt).toBeUndefined();
    expect(res.body.data.getSample[0].deletedAt).toBeUndefined();
    // 2件目のデータを確認
    expect(res.body.data.getSample[1].id).toBe(2);
    expect(res.body.data.getSample[1].title).toBe('タイトル2');
    expect(res.body.data.getSample[1].description).toBe('説明2');
    expect(res.body.data.getSample[1].createdAt).toBeUndefined();
    expect(res.body.data.getSample[1].updatedAt).toBeUndefined();
    expect(res.body.data.getSample[1].deletedAt).toBeUndefined();
  });
});
