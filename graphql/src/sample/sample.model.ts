// GraphQLのスキーマにおける型の定義
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SampleModel {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => Date, { nullable: true })
  deletedAt: Date | null;
}
