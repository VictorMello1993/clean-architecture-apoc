import { ITokenProvider } from "@core/ports/usuario/ITokenProvider";
import jwt from "jsonwebtoken";

export class JwtAdapter implements ITokenProvider {
  constructor (private secret: string) {}

  gerar(payload: string | object): string {
    return jwt.sign(payload, this.secret, { expiresIn: "4h" });
  }

  validar(token: string): string | object {
    return jwt.verify(token, this.secret);
  }
}
