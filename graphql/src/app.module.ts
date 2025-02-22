import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';
import { SampleModule } from './sample/sample.module';

// 開発環境のみPlaygroundを使えるようにするためのフラグを設定
const configService = new ConfigService();
const nodeEnv = configService.get<string>('NODE_ENV') ?? 'development';
const playgroundFlag = nodeEnv != 'production';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: playgroundFlag,
    }),
    SampleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
