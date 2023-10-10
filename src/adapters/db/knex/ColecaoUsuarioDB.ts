import { IColecaoUsuario } from "@core/ports/usuario/IColecaoUsuario";
import { Usuario } from "@core/ports/usuario/Usuario";
import conexao from "./conexao";

export class ColecaoUsuarioDB implements IColecaoUsuario {
  async inserir(usuario: Usuario): Promise<void> {
    await conexao.table("usuarios").insert(usuario);
  }

  async buscarPorEmail(email: string): Promise<Usuario | null> {
    return conexao.table("usuarios").where("email", email).first();
  }

  async buscarPorId(id: string): Promise<Usuario | null> {
    return conexao.table("usuarios").where("id", id).first();
  }
}
