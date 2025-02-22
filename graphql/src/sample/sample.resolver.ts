import { Resolver } from '@nestjs/graphql';
import { Query } from '@nestjs/graphql';
import { SampleModel } from './sample.model';
import { SampleService } from './sample.service';

@Resolver()
export class SampleResolver {
  constructor(private readonly sampleService: SampleService) {}

  /**
   * サンプルクエリ
   * @returns サンプルモデル[]
   */
  @Query(() => [SampleModel], { nullable: true })
  async getSample(): Promise<SampleModel[]> {
    return await this.sampleService.getSampleData();
  }
}
