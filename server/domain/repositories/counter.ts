import {CounterDataSource} from '../../data/interfaces/data-sources'
import {CounterRequestModel, CounterResponseModel} from '../models'
import {CounterRepository} from '../interfaces/repositories'

export class CounterRepositoryImpl implements CounterRepository {
  counterDataSource: CounterDataSource

  constructor(counterDataSource: CounterDataSource) {
    this.counterDataSource = counterDataSource
  }

  async getCounter(): Promise<CounterResponseModel | null> {
    return await this.counterDataSource.get();
  }

  async setCounter(contact: CounterRequestModel) {
    await this.counterDataSource.set(contact)
  }
}
