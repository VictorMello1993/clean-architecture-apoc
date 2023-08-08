import { IColecao } from "./IColecao";
import { InverterSenha } from "./InverterSenha";

export class RegistrarUsuarioUseCase {
  private inverterSenha = new InverterSenha();

  constructor(private colecao: IColecao) {}

  executar(nome: string, email: string, senha: string) {
    const senhaFake = this.inverterSenha.criptografar(senha);

    const usuario = {
      id: Math.random(),
      nome,
      email,
      senha: senhaFake
    };

    this.colecao.inserir(usuario);

    return usuario;
  }
}
