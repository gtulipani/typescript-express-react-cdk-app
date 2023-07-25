import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

import {DynamoDBCounterDataSource} from './data/data-sources/dynamodb'
import {CounterRepositoryImpl} from './domain/repositories'
import {GetCounter,SetCounter}  from './domain/use-cases/counter'
import {CounterRouter} from './presentation/routers'

const dataSource = new DynamoDBCounterDataSource({
  table: process.env.DB_TABLE || 'State',
  client: new DynamoDBClient({ region: process.env.AWS_REGION || "us-east-1" }),
})

export const counterMiddleWare = CounterRouter(
  new GetCounter(new CounterRepositoryImpl(dataSource)),
  new SetCounter(new CounterRepositoryImpl(dataSource))
)
