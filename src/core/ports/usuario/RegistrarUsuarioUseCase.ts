import { InverterSenha } from "@adapters/auth/InverterSenha";
import { BaseId } from "@core/shared/BaseId";
import { IColecaoUsuario } from "./IColecaoUsuario";
import { ICriptografiaProvider } from "./ICriptografiaProvider";
import { Usuario } from "./Usuario";
import { IUseCase } from "../../shared/IUseCase";

type Entrada = {nome: string, email: string, senha: string}

export class RegistrarUsuarioUseCase implements IUseCase<Entrada, Usuario> {
  private inverterSenha = new InverterSenha();

  constructor(
    // Aqui descrevem o conceito de porta na Arquitetura Hexagonal
    private colecao: IColecaoUsuario,
    private criptografiaProvider: ICriptografiaProvider
  ) {}

  async executar(dto: Entrada) {
    const senhaCriptografada = this.criptografiaProvider.criptografar(dto.senha);
    const usuarioExiste = await this.colecao.buscarPorEmail(dto.email);

    if (usuarioExiste) {
      throw new Error("Já existe usuário cadastrado com o e-mail informado");
    }

    const usuario: Usuario = {
      id: BaseId.gerar(),
      nome: dto.nome,
      email: dto.email,
      senha: senhaCriptografada
    };

    await this.colecao.inserir(usuario);

    return usuario;
  }
}
