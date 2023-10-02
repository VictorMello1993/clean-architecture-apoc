import { IColecaoUsuario } from "../../../portas/usuario/IColecaoUsuario";
import { Usuario } from "../../../portas/usuario/Usuario";
import conexao from "./conexao";

export class ColecaoUsuarioDB implements IColecaoUsuario {
  async inserir(usuario: Usuario): Promise<void> {
    await conexao.table("usuarios").insert(usuario);
  }
}
