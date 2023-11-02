import { ITransacaoRepository } from "@core/ports/transacao/ITransacaoRepository";
import { Transacao } from "@core/ports/transacao/Transacao";
import conexao from "./knex/conexao";

export class ColecaoTransacaoDB implements ITransacaoRepository {
  async adicionar(transacao: Transacao): Promise<void> {
    return await conexao
      .table("transacoes")
      .insert(this._toTable(transacao));
  }

  async atualizar(transacao: Transacao): Promise<void> {
    return await conexao
      .table("transacoes")
      .where("id", transacao.id)
      .update(this._toTable(transacao));
  }
  // ...transacao,
  // vencimento: transacao.vencimento.toISOString(),
  // usuario_id: transacao.idUsuario

  async buscarPorId(idUsuario: string, id: string): Promise<Transacao | null> {
    const transacoes = await conexao.table("transacoes").where({
      id,
      usuario_id: idUsuario
    });

    if (transacoes.length === 0) return null;
    return this._fromTable(transacoes[0]);
  }

  async buscarPorMes(idUsuario: string, ano: number, mes: number): Promise<Transacao[]> {
    const transacoes = await conexao
      .table("transacoes")
      .where("usuario_id", idUsuario)
      .whereRaw("extract(year from cast(vencimento as date)) = ?", ano)
      .whereRaw("extract(month from cast(vencimento as date)) = ?", mes);

    return transacoes.map(this._fromTable);
  }

  private _toTable(transacao: Transacao): any {
    return {
      id: transacao.id,
      descricao: transacao.descricao,
      valor: transacao.valor,
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
