import { Injectable } from '@nestjs/common';
import { SampleModel } from './sample.model';

@Injectable()
export class SampleService {
  /**
   * サンプルデータの取得
   * @returns サンプルデータ
   */
  // eslint-disable-next-line
  async getSampleData(): Promise<SampleModel[]> {
    const data = [
      {
        id: 1,
        title: 'タイトル1',
        description: '説明1',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: 2,
        title: 'タイトル2',
        description: '説明2',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
    ];

    return data;
  }
}
