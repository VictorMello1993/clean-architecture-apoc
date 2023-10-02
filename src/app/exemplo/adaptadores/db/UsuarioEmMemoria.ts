import { IColecaoUsuario } from "../../portas/usuario/IColecaoUsuario";
import { Usuario } from "../../portas/usuario/Usuario";

export class UsuarioEmMemoria implements IColecaoUsuario {
  private static itens: Usuario[] = [];
  async inserir(usuario: Usuario): Promise<void> {
    UsuarioEmMemoria.itens.push(usuario);
  }
}
