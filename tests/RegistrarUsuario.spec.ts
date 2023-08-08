import { BancoDadosEmMemoria } from "./../src/BancoDadosEmMemoria";
import { IColecao } from "../src/IColecao";
import { RegistrarUsuarioUseCase } from "../src/RegistrarUsuario";

test("Deve ser possível registrar um usuário", () => {
  const colecao: IColecao = new BancoDadosEmMemoria();
  const registrarUsuarioUseCase = new RegistrarUsuarioUseCase(colecao);

  const usuario = registrarUsuarioUseCase.executar("Victor Mello", "victor@teste.com.br", "123456");

  expect(usuario).toHaveProperty("id");
  expect(usuario.nome).toBe("Victor Mello");
});
