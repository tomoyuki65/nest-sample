// 外部APIを呼び出す処理を記述する想定
import { Injectable } from '@nestjs/common';
import { PostSampleResponse } from './sample.dto';
import { HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class SampleRepository {
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
}
