export interface ITokenProvider {
  gerar(payload: string | object): string
  validar(token: string): string | object
}
