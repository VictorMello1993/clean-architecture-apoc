import { IUsuarioRepository } from "@core/ports/usuario/IUsuarioRepository";
import { Usuario } from "@core/ports/usuario/Usuario";

export class ColecaoUsuarioEmMemoria implements IUsuarioRepository {
  private itens: Usuario[] = [];
  async inserir(usuario: Usuario): Promise<void> {
    this.itens.push(usuario);
  }

  async buscarPorEmail(email: string): Promise<Usuario | null> {
    const usuario = this.itens.find(usuario => usuario.email === email);
    return usuario ?? null;
  }

  async buscarPorId(id: string): Promise<Usuario | null> {
    const usuario = this.itens.find(usuario => usuario.id === id);
    return usuario ?? null;
  }
}
