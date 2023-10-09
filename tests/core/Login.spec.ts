import { BcryptAdapter } from "@adapters/auth/BcryptAdapter";
import { ColecaoUsuarioEmMemoria } from "@adapters/db/ColecaoUsuarioEmMemoria";
import { IColecaoUsuario } from "@core/ports/usuario/IColecaoUsuario";
import { RegistrarUsuarioUseCase } from "@core/ports/usuario/RegistrarUsuarioUseCase";
import { LoginUseCase } from "@core/ports/usuario/LoginUseCase";

test("Um usuário deve possuir uma conta para efetuar login", async () => {
  const colecao: IColecaoUsuario = new ColecaoUsuarioEmMemoria();
  const criptografiaProvider = new BcryptAdapter();
  const registrarUsuarioUseCase = new RegistrarUsuarioUseCase(colecao, criptografiaProvider);
  const loginUseCase = new LoginUseCase(colecao, criptografiaProvider);

  const usuario = await registrarUsuarioUseCase.executar("Victor Mello", "victor@teste.com.br", "123456");
  await loginUseCase.executar("victor@teste.com.br", "123456");

  expect(criptografiaProvider.comparar("123456", usuario.senha!)).toBeTruthy();
});

test("Deve ser possível efetuar login com a conta existente", async () => {
  const colecao: IColecaoUsuario = new ColecaoUsuarioEmMemoria();
  const criptografiaProvider = new BcryptAdapter();
  const registrarUsuarioUseCase = new RegistrarUsuarioUseCase(colecao, criptografiaProvider);
  const loginUseCase = new LoginUseCase(colecao, criptografiaProvider);

  await registrarUsuarioUseCase.executar("Victor Mello", "victor@teste.com.br", "123456");
  const token = await loginUseCase.executar("victor@teste.com.br", "123456");

  expect(token).not.toBeNull();
  expect(token).not.toBeUndefined();
});
