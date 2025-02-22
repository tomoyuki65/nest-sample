import { Module } from '@nestjs/common';
import { SampleService } from './sample.service';
import { SampleController } from './sample.controller';
import { SampleRepository } from './sample.repo';

@Module({
  providers: [SampleService, SampleRepository],
  controllers: [SampleController],
})
export class SampleModule {}
