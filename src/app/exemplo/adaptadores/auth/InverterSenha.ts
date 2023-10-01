import { ICriptografiaProvider } from "../../portas/ICriptografiaProvider";

export class InverterSenha implements ICriptografiaProvider {
  criptografar(senha: string): string {
    return senha.split("").reverse().join("");
  }
}
