import { ICriptografiaProvider } from "@core/ports/usuario/ICriptografiaProvider";

export class InverterSenha implements ICriptografiaProvider {
  criptografar(senha: string): string {
    return senha.split("").reverse().join("");
  }

  comparar(senha: string, senhaCriptografada: string): boolean {
    const senhaInvertida = this.criptografar(senha);
    return senhaInvertida === senhaCriptografada;
  }
}
