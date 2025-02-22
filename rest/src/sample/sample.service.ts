import { Injectable } from '@nestjs/common';
import {
  GetSampleResponse,
  PostSampleRequestBody,
  PostSampleResponse,
} from './sample.dto';
import { SampleRepository } from './sample.repo';
import { HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class SampleService {
  constructor(private readonly sampleRepo: SampleRepository) {}

  getService(): GetSampleResponse {
    return { id: 1, text: 'sample' } as GetSampleResponse;
  }

  async postService(body: PostSampleRequestBody): Promise<PostSampleResponse> {
    try {
      // eslint-disable-next-line
      const res = await this.sampleRepo.textProcessing(body.text);

      // eslint-disable-next-line
      return res.data;
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
