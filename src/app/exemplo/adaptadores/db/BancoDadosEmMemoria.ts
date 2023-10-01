import { IColecao } from "../../portas/IColecao";

export class BancoDadosEmMemoria implements IColecao {
  private static itens: any[] = [];

  inserir(item: any) {
    BancoDadosEmMemoria.itens.push(item);
    return item;
  }
}
