import bcrypt from "bcrypt";
import { ICriptografiaProvider } from "../../portas/ICriptografiaProvider";

export class BcryptAdapter implements ICriptografiaProvider {
  criptografar(senha: string): string {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(senha, salt);
  }

  comparar(senha: string, senhaCriptografada: string): boolean {
    return bcrypt.compareSync(senha, senhaCriptografada);
  }
}
