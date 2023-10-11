import { ITransacaoRepository } from "@core/ports/transacao/ITransacaoRepository";
import { Transacao } from "@core/ports/transacao/Transacao";
import conexao from "./knex/conexao";

export class ColecaoTransacaoDB implements ITransacaoRepository {
  async adicionar(transacao: Transacao): Promise<void> {
    return await conexao
      .table(this._toTable(transacao))
      .insert({
        ...transacao,
        vencimento: transacao.vencimento.toISOString(),
        usuario_id: transacao.idUsuario
      });
  }

  async atualizar(transacao: Transacao): Promise<void> {
    return await conexao
      .table(this._toTable(transacao))
      .where("id", transacao.id)
      .update({
        ...transacao,
        vencimento: transacao.vencimento.toISOString(),
        usuario_id: transacao.idUsuario
      });
  }

  async buscarPorId(idUsuario: string, id: string): Promise<Transacao | null> {
    const transacoes = await conexao.table("transacoes").where({
      id,
      usuario_id: idUsuario
    });

    if (transacoes.length === 0) return null;
    return this._fromTable(transacoes[0]);
  }

  async buscarPorMes(idUsuario: string, ano: number, mes: number): Promise<Transacao[] | null> {
    const transacoes = await conexao
      .table("transacoes")
      .where("usuario_id", idUsuario)
      .whereRaw("extract(year from vencimento) = ?", ano)
      .whereRaw("extract(month from vencimento) = ?", mes);

    return transacoes.map(this._fromTable);
  }

  private _toTable(transacao: Transacao): any {
    return {
      ...transacao,
      vencimento: transacao.vencimento.toISOString(),
      usuario_id: transacao.idUsuario
    };
  }

  private _fromTable(transacao: any): Transacao {
    return {
      ...transacao,
      idUsuario: transacao.usuario_id
    };
  }
}
