import { IColecao } from "./IColecao";

export class BancoDadosEmMemoria implements IColecao {
  static itens: any[] = [];

  inserir(item: any) {
    BancoDadosEmMemoria.itens.push(item);
    return item;
  }
}
