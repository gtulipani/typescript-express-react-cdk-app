import {CounterRequestModel} from '../../models'

export interface SetCounterUseCase {
  execute(counter: CounterRequestModel): void;
}
