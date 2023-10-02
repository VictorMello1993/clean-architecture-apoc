import { Usuario } from "../usuario/Usuario";

export interface IColecaoUsuario {
  inserir(usuario: Usuario): Promise<void>
}
