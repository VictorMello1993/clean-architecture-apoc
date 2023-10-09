import { IUseCase } from "../../shared/IUseCase";
import { IColecaoUsuario } from "./IColecaoUsuario";
import { ICriptografiaProvider } from "./ICriptografiaProvider";
import jwt from "jsonwebtoken";

const MSG_EMAIL_OU_SENHA_INVALIDA = "E-mail ou senha inválidos";

type Entrada = {email: string, senha: string}
type Saida = {token: string}

export class LoginUseCase implements IUseCase<Entrada, Saida> {
  constructor(
    private colecaoUsuario: IColecaoUsuario,
    private criptografiaProvider: ICriptografiaProvider
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

    const secret_key = process.env.SECRET_KEY;

    const token = jwt.sign({}, secret_key as string, {
      subject: usuario.id,
      expiresIn: "4h"
    });

    return { token };
  }
}
