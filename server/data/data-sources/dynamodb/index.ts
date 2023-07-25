import {DynamoDBClient, GetItemCommand, PutItemCommand} from '@aws-sdk/client-dynamodb'
import {marshall, unmarshall} from '@aws-sdk/util-dynamodb'

import {CounterRequestModel, CounterResponseModel} from '../../../domain/models';
import {CounterDataSource} from '../../interfaces/data-sources';

type DynamoDBCounterDataSourceProps = {
  table: string,
  client: DynamoDBClient,
}

export class DynamoDBCounterDataSource implements CounterDataSource {
  private readonly table: string
  private client: DynamoDBClient

  constructor(props: DynamoDBCounterDataSourceProps) {
    this.table = props.table
    this.client = props.client
  }

  async get(): Promise<CounterResponseModel> {
    try {
      const result = await this.client.send(new GetItemCommand({
        TableName: this.table,
        Key: marshall({
          "id": "counter",
        }),
        ProjectionExpression: "val",
      }));

      if (!result.Item) {
        return {val: 0}
      }

      return unmarshall(result.Item) as CounterResponseModel
    } catch (err) {
      console.error(err)
    }

    return {val: 0}
  }

  async set(contact: CounterRequestModel) {
    try {
      const result = await this.client.send(new PutItemCommand({
        TableName: this.table,
        Item: marshall({
          "id": "counter",
          "val": contact.val,
        })
      }));
      console.log(result)
    } catch (err) {
      console.error(err)
    }
  }
}
