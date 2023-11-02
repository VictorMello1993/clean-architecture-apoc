import { IUseCase } from "@core/shared/IUseCase";
import { Usuario } from "@ports/usuario/Usuario";
import { ITransacaoRepository } from "@ports/transacao/ITransacaoRepository";
import { Saldo, SaldoDTO } from "@ports/transacao/Saldo";
import { Transacao } from "@ports/transacao/Transacao";

export type Entrada = {usuario: Usuario, ano: number, mes: number}
export type Saida = {transacoes: Transacao[], saldo: SaldoDTO}

export class ExtratoMensalUseCase implements IUseCase<Entrada, Saida> {
  constructor(
    private transacaoRepository: ITransacaoRepository
  ) {}

  async executar(dto: Entrada): Promise<Saida> {
    const transacoes = await this.transacaoRepository.buscarPorMes(dto.usuario.id, dto.ano, dto.mes);

    return {
      transacoes,
      saldo: new Saldo(transacoes).dto
    };
  }
}
