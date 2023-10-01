import { ICriptografiaProvider } from "../../portas/ICriptografiaProvider";

export class SenhaComEspacos implements ICriptografiaProvider {
  criptografar(senha: string): string {
    return senha.split("").join(" ");
  }
}
