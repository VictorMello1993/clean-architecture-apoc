export class InverterSenha {
  criptografar(senha: string): string {
    return senha.split("").reverse().join("");
  }
}
