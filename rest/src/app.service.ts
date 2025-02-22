import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}

  getHello(): string {
    const port = this.configService.get<number>('PORT');
    const nodeEnv = this.configService.get<string>('NODE_ENV');
    const env = this.configService.get<string>('ENV');

    return `Hello World !! [PORT: ${port}, NODE_ENV: ${nodeEnv}, ENV: ${env}]`;
  }
}
