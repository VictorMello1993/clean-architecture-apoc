import { BancoDadosEmMemoria } from "./BancoDadosEmMemoria";
import { InverterSenha } from "./InverterSenha";

export class RegistrarUsuarioUseCase {
  private bancoDados = new BancoDadosEmMemoria();
  private inverterSenha = new InverterSenha();

  executar(nome: string, email: string, senha: string) {
    const senhaFake = this.inverterSenha.criptografar(senha);

    const usuario = {
      id: Math.random(),
      nome,
      email,
      senha: senhaFake
    };

    this.bancoDados.inserir(usuario);

    return usuario;
  }
}
