import {CounterResponseModel} from '../../models'

export interface GetCounterUseCase {
  execute(): Promise<CounterResponseModel>;
}
