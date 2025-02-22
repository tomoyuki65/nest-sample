import { Controller, Get, Post, Body, HttpCode } from '@nestjs/common';
import {
  GetSampleResponse,
  GetSampleResponseDto,
  PostSampleRequestBody,
  PostSampleRequestBodyDto,
  PostSampleResponse,
  PostSampleResponseDto,
} from './sample.dto';
import { SampleService } from './sample.service';
import { ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@Controller('api/v1/sample')
export class SampleController {
  constructor(private readonly sampleService: SampleService) {}

  @Get('get')
  @ApiOperation({ description: 'GETメソッドのサンプルAPI' })
  @ApiResponse({
    status: 200,
    description: 'APIが正常終了',
    type: GetSampleResponseDto,
  })
  getSample(): GetSampleResponse {
    return this.sampleService.getService();
  }

  @Post('post')
  @HttpCode(200)
  @ApiOperation({ description: 'POSTメソッドのサンプルAPI' })
  @ApiBody({ type: PostSampleRequestBodyDto })
  @ApiResponse({
    status: 200,
    description: 'APIが正常終了',
    type: PostSampleResponseDto,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
  })
  async postSample(
    @Body() body: PostSampleRequestBody,
  ): Promise<PostSampleResponse> {
    return await this.sampleService.postService(body);
  }
}
