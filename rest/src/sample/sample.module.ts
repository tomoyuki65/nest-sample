import { Module } from '@nestjs/common';
import { SampleService } from './sample.service';
import { SampleController } from './sample.controller';
import { SampleRepository } from './sample.repo';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [SampleService, SampleRepository],
  controllers: [SampleController],
})
export class SampleModule {}
