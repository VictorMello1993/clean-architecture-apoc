export interface ICriptografiaProvider {
  criptografar(senha: string): string
  comparar(senha: string, senhaCriptografada: string): boolean
}
