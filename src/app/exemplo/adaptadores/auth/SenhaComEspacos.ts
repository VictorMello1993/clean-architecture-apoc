import { ICriptografiaProvider } from "../../usuario/ICriptografiaProvider";

export class SenhaComEspacos implements ICriptografiaProvider {
  criptografar(senha: string): string {
    return senha.split("").join(" ");
  }

  comparar(senha: string, senhaCriptografada: string): boolean {
    const senhaInvertida = this.criptografar(senha);
    return senhaInvertida === senhaCriptografada;
  }
}
