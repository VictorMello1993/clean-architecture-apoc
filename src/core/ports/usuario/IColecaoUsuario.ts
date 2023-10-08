import { Usuario } from "./Usuario";

export interface IColecaoUsuario {
  inserir(usuario: Usuario): Promise<void>
  buscarPorEmail(email: string): Promise<Usuario | null>
}