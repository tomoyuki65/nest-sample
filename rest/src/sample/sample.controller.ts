import { Controller, Get, Post, Body, HttpCode } from '@nestjs/common';
import {
  GetSampleResponse,
  PostSampleRequestBody,
  PostSampleResponse,
} from './sample.dto';
import { SampleService } from './sample.service';

@Controller('api/v1/sample')
export class SampleController {
  constructor(private readonly sampleService: SampleService) {}

  @Get('get')
  getSample(): GetSampleResponse {
    return this.sampleService.getService();
  }

  @Post('post')
  @HttpCode(200)
  async postSample(
    @Body() body: PostSampleRequestBody,
  ): Promise<PostSampleResponse> {
    return await this.sampleService.postService(body);
  }
}
