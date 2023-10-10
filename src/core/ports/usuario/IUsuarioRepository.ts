import { Usuario } from "./Usuario";

export interface IUsuarioRepository {
  inserir(usuario: Usuario): Promise<void>
  buscarPorEmail(email: string): Promise<Usuario | null>
  buscarPorId(id: string): Promise<Usuario | null>
}
