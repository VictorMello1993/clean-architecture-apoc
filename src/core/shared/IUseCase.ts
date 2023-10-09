export interface IUseCase<IN, OUT> {
  executar(dto: IN): Promise<OUT>
}
