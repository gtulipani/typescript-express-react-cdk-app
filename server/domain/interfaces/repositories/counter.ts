import {CounterRequestModel, CounterResponseModel} from '../../models'

export interface CounterRepository {
  getCounter(): Promise<CounterResponseModel | null>;

  setCounter(counter: CounterRequestModel): void;
}
