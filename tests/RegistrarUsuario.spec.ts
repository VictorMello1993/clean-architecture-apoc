import { RegistrarUsuarioUseCase } from "../src/RegistrarUsuario";

test("Deve ser possível registrar um usuário", () => {
  const registrarUsuarioUseCase = new RegistrarUsuarioUseCase();

  const usuario = registrarUsuarioUseCase.executar("Victor Mello", "victor@teste.com.br", "123456");

  expect(usuario).toHaveProperty("id");
  expect(usuario.nome).toBe("Victor Mello");
});
