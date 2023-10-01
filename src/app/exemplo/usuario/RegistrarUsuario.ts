import { InverterSenha } from "../adaptadores/InverterSenha";
import { IColecao } from "../portas/IColecao";
import { ICriptografiaProvider } from "../portas/ICriptografiaProvider";

export class RegistrarUsuarioUseCase {
  private inverterSenha = new InverterSenha();

  constructor(
    // Aqui descrevem o conceito de porta na Arquitetura Hexagonal
    private colecao: IColecao,
    private criptografiaProvider: ICriptografiaProvider
  ) {}

  executar(nome: string, email: string, senha: string) {
    const senhaFake = this.criptografiaProvider.criptografar(senha);

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
