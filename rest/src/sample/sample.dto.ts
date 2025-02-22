// リクエストパラメータやレスポンスの型を定義
import { ApiProperty } from '@nestjs/swagger';

export interface GetSampleResponse {
  id: number;
  text: string;
}

export class GetSampleResponseDto implements GetSampleResponse {
  @ApiProperty()
  id: number;

  @ApiProperty()
  text: string;
}

export interface PostSampleRequestBody {
  text: string;
}

export class PostSampleRequestBodyDto implements PostSampleRequestBody {
  @ApiProperty()
  text: string;
}

export interface PostSampleResponse {
  upperText: string;
  lowerText: string;
  textLength: number;
}

export class PostSampleResponseDto implements PostSampleResponse {
  @ApiProperty()
  upperText: string;

  @ApiProperty()
  lowerText: string;

  @ApiProperty()
  textLength: number;
}
