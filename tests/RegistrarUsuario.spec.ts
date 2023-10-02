import { BcryptAdapter } from "./../src/app/exemplo/adaptadores/auth/BcryptAdapter";
import { SenhaComEspacos } from "./../src/app/exemplo/adaptadores/auth/SenhaComEspacos";
import { InverterSenha } from "./../src/app/exemplo/adaptadores/auth/InverterSenha";
import { UsuarioEmMemoria } from "./../src/app/exemplo/adaptadores/db/UsuarioEmMemoria";
import { RegistrarUsuarioUseCase } from "./../src/app/exemplo/usuario/RegistrarUsuarioUseCase";
import { IColecaoUsuario } from "../src/app/exemplo/usuario/IColecaoUsuario";

test("Deve ser possível registrar um usuário invertendo a senha", () => {
  const colecao: IColecaoUsuario = new UsuarioEmMemoria();
  const criptografiaProvider = new InverterSenha();
  const registrarUsuarioUseCase = new RegistrarUsuarioUseCase(colecao, criptografiaProvider);

  const usuario = registrarUsuarioUseCase.executar("Victor Mello", "victor@teste.com.br", "123456");

  expect(usuario).toHaveProperty("id");
  expect(usuario.nome).toBe("Victor Mello");
  expect(usuario.senha).toBe("654321");
});

test("Deve ser possível registrar um usuário com senha com espaços", () => {
  const colecao: IColecaoUsuario = new UsuarioEmMemoria();
  const criptografiaProvider = new SenhaComEspacos();
  const registrarUsuarioUseCase = new RegistrarUsuarioUseCase(colecao, criptografiaProvider);

  const usuario = registrarUsuarioUseCase.executar("Victor Mello", "victor@teste.com.br", "123456");

  expect(usuario).toHaveProperty("id");
  expect(usuario.nome).toBe("Victor Mello");
  expect(usuario.senha).toBe("1 2 3 4 5 6");
});

test("Deve ser possível registrar um usuário com senha criptografada", () => {
  const colecao: IColecaoUsuario = new UsuarioEmMemoria();
  const criptografiaProvider = new BcryptAdapter();
  const registrarUsuarioUseCase = new RegistrarUsuarioUseCase(colecao, criptografiaProvider);

  const usuario = registrarUsuarioUseCase.executar("Victor Mello", "victor@teste.com.br", "123456");

  expect(usuario).toHaveProperty("id");
  expect(usuario.nome).toBe("Victor Mello");
  expect(criptografiaProvider.comparar("123456", usuario.senha!)).toBeTruthy();
});
