export class BancoDadosEmMemoria {
  static itens: any[] = [];

  inserir(item: any) {
    BancoDadosEmMemoria.itens.push(item);
    return item;
  }
}
