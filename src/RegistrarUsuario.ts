export default class RegistrarUsuarioUseCase {
  usuarios: any[] = [];

  executar(nome: string, email: string, senha: string) {
    const senhaFake = senha.split("").reverse().join("");

    const usuario = {
      id: Math.random(),
      nome,
      email,
      senha: senhaFake
    };

    this.usuarios.push(usuario);

    return usuario;
  }
}
