import { IUseCase } from "@core/shared/IUseCase";
import { Transacao } from "./Transacao";
import { ITransacaoRepository } from "./ITransacaoRepository";
import { BaseId } from "@core/shared/BaseId";
import { Usuario } from "../usuario/Usuario";

export type Entrada = {transacao: Transacao, id: string, usuario: Usuario}

export class SalvarTransacaoUseCase implements IUseCase<Entrada, void> {
  constructor(
    private transacaoRepository: ITransacaoRepository
  ) {}

  async executar(dto: Entrada): Promise<void> {
    if (dto.transacao.idUsuario !== dto.usuario.id) {
      throw new Error("Usuário não autorizado");
    }

    const transacao = { ...dto.transacao, id: dto.id ?? BaseId.gerar(), idUsuario: dto.usuario.id };
    dto.id
      ? await this.transacaoRepository.atualizar(transacao)
      : await this.transacaoRepository.adicionar(transacao);
  }
}
