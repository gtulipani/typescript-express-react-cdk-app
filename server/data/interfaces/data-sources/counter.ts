import {CounterRequestModel, CounterResponseModel} from "../../../domain/models";

export interface CounterDataSource {
  set(counter: CounterRequestModel): void;

  get(): Promise<CounterResponseModel | null>;
}
