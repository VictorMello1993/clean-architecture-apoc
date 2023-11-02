import { Transacao } from "./Transacao";

export interface ITransacaoRepository {
  adicionar(transacao: Transacao): Promise<void>
  atualizar(transacao: Transacao): Promise<void>
  buscarPorId(idUsuario: string, id: string): Promise<Transacao | null>
  buscarPorMes(idUsuario: string, ano: number, mes: number): Promise<Transacao[]>
}
