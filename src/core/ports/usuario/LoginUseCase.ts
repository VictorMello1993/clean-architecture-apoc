import { IUseCase } from "@core/shared/IUseCase";
import { IColecaoUsuario } from "./IColecaoUsuario";
import { ICriptografiaProvider } from "./ICriptografiaProvider";
import { ITokenProvider } from "./ITokenProvider";

const MSG_EMAIL_OU_SENHA_INVALIDA = "E-mail ou senha inválidos";

type Entrada = {email: string, senha: string}
type Saida = {token: string}

export class LoginUseCase implements IUseCase<Entrada, Saida> {
  constructor(
    private colecaoUsuario: IColecaoUsuario,
    private criptografiaProvider: ICriptografiaProvider,
    private tokenProvider: ITokenProvider
  ) {}

  async executar(dto: Entrada) {
    const usuario = await this.colecaoUsuario.buscarPorEmail(dto.email);

    if (!usuario) {
      throw new Error(MSG_EMAIL_OU_SENHA_INVALIDA);
    }

    const senhaComparada = this.criptografiaProvider.comparar(dto.senha, usuario.senha!);

    if (!senhaComparada) {
      throw new Error(MSG_EMAIL_OU_SENHA_INVALIDA);
    }

    const token = this.tokenProvider.gerar({ id: usuario.id, nome: usuario.nome });

    return { token };
  }
}
