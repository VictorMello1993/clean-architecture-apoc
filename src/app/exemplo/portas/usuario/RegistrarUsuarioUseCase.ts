import { InverterSenha } from "../../adaptadores/auth/InverterSenha";
import { IColecaoUsuario } from "./IColecaoUsuario";
import { ICriptografiaProvider } from "./ICriptografiaProvider";
import { Usuario } from "./Usuario";

export class RegistrarUsuarioUseCase {
  private inverterSenha = new InverterSenha();

  constructor(
    // Aqui descrevem o conceito de porta na Arquitetura Hexagonal
    private colecao: IColecaoUsuario,
    private criptografiaProvider: ICriptografiaProvider
  ) {}

  executar(nome: string, email: string, senha: string) {
    const senhaCriptografada = this.criptografiaProvider.criptografar(senha);

    const usuario: Usuario = {
      id: `${Math.random()}`,
      nome,
      email,
      senha: senhaCriptografada
    };

    this.colecao.inserir(usuario);

    return usuario;
  }
}
