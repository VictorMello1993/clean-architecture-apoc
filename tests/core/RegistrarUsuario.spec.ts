import { BcryptAdapter } from "@adapters/auth/BcryptAdapter";
import { SenhaComEspacos } from "@adapters/auth/SenhaComEspacos";
import { IColecaoUsuario } from "@core/ports/usuario/IColecaoUsuario";
import { InverterSenha } from "@adapters/auth/InverterSenha";
import { ColecaoUsuarioEmMemoria } from "@adapters/db/ColecaoUsuarioEmMemoria";
import { RegistrarUsuarioUseCase } from "@core/ports/usuario/RegistrarUsuarioUseCase";
test("Deve ser possível registrar um usuário invertendo a senha", async() => {
  const colecao: IColecaoUsuario = new ColecaoUsuarioEmMemoria();
  const criptografiaProvider = new InverterSenha();
  const registrarUsuarioUseCase = new RegistrarUsuarioUseCase(colecao, criptografiaProvider);

  const usuario = await registrarUsuarioUseCase.executar("Victor Mello", "victor@teste.com.br", "123456");

  expect(usuario).toHaveProperty("id");
  expect(usuario.nome).toBe("Victor Mello");
  expect(usuario.senha).toBe("654321");
});

test("Deve ser possível registrar um usuário com senha com espaços", async () => {
  const colecao: IColecaoUsuario = new ColecaoUsuarioEmMemoria();
  const criptografiaProvider = new SenhaComEspacos();
  const registrarUsuarioUseCase = new RegistrarUsuarioUseCase(colecao, criptografiaProvider);

  const usuario = await registrarUsuarioUseCase.executar("Victor Mello", "victor@teste.com.br", "123456");

  expect(usuario).toHaveProperty("id");
  expect(usuario.nome).toBe("Victor Mello");
  expect(usuario.senha).toBe("1 2 3 4 5 6");
});

test("Deve ser possível registrar um usuário com senha criptografada", async () => {
  const colecao: IColecaoUsuario = new ColecaoUsuarioEmMemoria();
  const criptografiaProvider = new BcryptAdapter();
  const registrarUsuarioUseCase = new RegistrarUsuarioUseCase(colecao, criptografiaProvider);

  const usuario = await registrarUsuarioUseCase.executar("Victor Mello", "victor@teste.com.br", "123456");

  expect(usuario).toHaveProperty("id");
  expect(usuario.nome).toBe("Victor Mello");
  expect(criptografiaProvider.comparar("123456", usuario.senha!)).toBeTruthy();
});

test.skip("Deve ser possível registrar um usuário no banco real", async () => {
  const colecao: IColecaoUsuario = new ColecaoUsuarioEmMemoria();
  const criptografiaProvider = new BcryptAdapter();
  const registrarUsuarioUseCase = new RegistrarUsuarioUseCase(colecao, criptografiaProvider);

  const usuario = await registrarUsuarioUseCase.executar("Victor Mello", "victor@teste.com.br", "123456");

  expect(usuario).toHaveProperty("id");
  expect(usuario.nome).toBe("Victor Mello");
  expect(criptografiaProvider.comparar("123456", usuario.senha!)).toBeTruthy();
});

test("Não deve permitir cadastrar usuário com o mesmo e-mail", async () => {
  const colecao: IColecaoUsuario = new ColecaoUsuarioEmMemoria();
  const criptografiaProvider = new BcryptAdapter();
  const registrarUsuarioUseCase = new RegistrarUsuarioUseCase(colecao, criptografiaProvider);

  const usuario = {
    nome: "Victor Mello",
    email: "victor@teste.com.br",
    senha: "123456"
  };

  await registrarUsuarioUseCase.executar("Victor Mello", "victor@teste.com.br", "123456");
  const exec = async () => await registrarUsuarioUseCase.executar(usuario.nome, usuario.email, usuario.senha);

  await expect(exec).rejects.toThrowError("Já existe usuário cadastrado com o e-mail informado");
});