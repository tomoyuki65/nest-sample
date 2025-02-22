// 外部APIを呼び出す処理を記述する想定
import { Injectable } from '@nestjs/common';
import { PostSampleResponse } from './sample.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class SampleRepository {
  constructor(private httpService: HttpService) {}

  // eslint-disable-next-line
  async textProcessing(text: string): Promise<any> {
    const upperText = text.toUpperCase();
    const lowerText = text.toLowerCase();
    const textLength = text.length;
    const data: PostSampleResponse = {
      upperText,
      lowerText,
      textLength,
    };
    const response = { data: data };

    return response;
  }

  // 外部API実行用のコードサンプル
  async execExternalApi(): Promise<any> {
    const url = "https://api.thecatapi.com/v1/images/search";

    try {
      const res = await firstValueFrom(
        this.httpService.get<any>(url),
      );

      return res.data;
    } catch (error) {
      console.error(error);
    }
  }

}
