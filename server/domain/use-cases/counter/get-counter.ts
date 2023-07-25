import {CounterResponseModel} from '../../models'
import {CounterRepository} from '../../interfaces/repositories'
import {GetCounterUseCase} from '../../interfaces/use-cases'

export class GetCounter implements GetCounterUseCase {
  counterRepository: CounterRepository

  constructor(counterRepository: CounterRepository) {
    this.counterRepository = counterRepository
  }

  async execute(): Promise<CounterResponseModel> {
    const result = await this.counterRepository.getCounter()

    if (!result) {
      return {val: 0}
    }

    return result
  }
}
