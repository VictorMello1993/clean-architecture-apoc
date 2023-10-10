import { BcryptAdapter } from "@adapters/auth/BcryptAdapter";
import { ColecaoUsuarioEmMemoria } from "@adapters/db/ColecaoUsuarioEmMemoria";
import { IColecaoUsuario } from "@core/ports/usuario/IColecaoUsuario";
import { RegistrarUsuarioUseCase } from "@core/ports/usuario/RegistrarUsuarioUseCase";
import { LoginUseCase } from "@core/ports/usuario/LoginUseCase";
import { JwtAdapter } from "@adapters/auth/JwtAdapter";
import usuarios from "../data/usuarios";

test("Um usuário deve possuir uma conta para efetuar login", async () => {
  const colecao: IColecaoUsuario = new ColecaoUsuarioEmMemoria();
  const criptografiaProvider = new BcryptAdapter();
  const tokenProvider = new JwtAdapter(process.env.SECRET_KEY as string);

  const registrarUsuarioUseCase = new RegistrarUsuarioUseCase(colecao, criptografiaProvider);
  const loginUseCase = new LoginUseCase(colecao, criptografiaProvider, tokenProvider);

  const usuario = await registrarUsuarioUseCase.executar({
    nome: usuarios.completo.nome,
    email: usuarios.completo.email,
    senha: usuarios.completo.senha!
  });

  await loginUseCase.executar({ email: "victor@teste.com", senha: "123456" });

  expect(criptografiaProvider.comparar("123456", usuario.senha!)).toBeTruthy();
});

test("Deve ser possível efetuar login com a conta existente", async () => {
  const colecao: IColecaoUsuario = new ColecaoUsuarioEmMemoria();
  const criptografiaProvider = new BcryptAdapter();
  const tokenProvider = new JwtAdapter(process.env.SECRET_KEY as string);

  const registrarUsuarioUseCase = new RegistrarUsuarioUseCase(colecao, criptografiaProvider);
  const loginUseCase = new LoginUseCase(colecao, criptografiaProvider, tokenProvider);

  await registrarUsuarioUseCase.executar({
    nome: usuarios.completo.nome,
    email: usuarios.completo.email,
    senha: usuarios.completo.senha!
  });
  const token = await loginUseCase.executar({ email: "victor@teste.com", senha: "123456" });

  expect(token).toHaveProperty("token");
});
