import { IUseCase } from "@core/shared/IUseCase";
import { Transacao } from "./Transacao";

export class SalvarTransacaoUseCase implements IUseCase<void, Transacao> {
  async executar(dto: void): Promise<Transacao> {
    return {
      id: "1",
      descricao: "Salário",
      valor: 1000,
      vencimento: new Date(),
      idUsuario: "1"
    };
  }
}
