import { IColecaoUsuario } from "@core/portas/usuario/IColecaoUsuario";
import { Usuario } from "@core/portas/usuario/Usuario";

export class ColecaoUsuarioEmMemoria implements IColecaoUsuario {
  private itens: Usuario[] = [];
  async inserir(usuario: Usuario): Promise<void> {
    this.itens.push(usuario);
  }

  async buscarPorEmail(email: string): Promise<Usuario | null> {
    const usuario = this.itens.find(usuario => usuario.email === email);
    return usuario ?? null;
  }
}
