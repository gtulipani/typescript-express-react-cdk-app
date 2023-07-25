import {CounterRequestModel} from '../../models'
import {CounterRepository} from '../../interfaces/repositories'
import {SetCounterUseCase} from '../../interfaces/use-cases'


export class SetCounter implements SetCounterUseCase {
  counterRepository: CounterRepository

  constructor(counterRepository: CounterRepository) {
    this.counterRepository = counterRepository
  }

  async execute(counter: CounterRequestModel) {
    await this.counterRepository.setCounter(counter)

  }
}
