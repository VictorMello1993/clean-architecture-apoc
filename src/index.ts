import "dotenv/config";
import { SalvarTransacaoUseCase } from "@core/ports/transacao/SalvarTransacaoUseCase";
import express from "express";
import { ColecaoUsuarioDB } from "@adapters/db/knex/ColecaoUsuarioDB";
import { BcryptAdapter } from "@adapters/auth/BcryptAdapter";
import { RegistrarUsuarioUseCase } from "@core/ports/usuario/RegistrarUsuarioUseCase";
import { RegistrarUsuarioController } from "@controllers/RegistrarUsuarioController";
import { LoginUseCase } from "@core/ports/usuario/LoginUseCase";
import { LoginController } from "@controllers/LoginController";
import { JwtAdapter } from "./adapters/auth/JwtAdapter";
import { SalvarTransacaoController } from "./controllers/SalvarTransacaoController";

export const app = express();

const porta = process.env.API_PORT ?? 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.listen(porta, () => console.log(`Server is running at port ${porta}...`));

// Rotas abertas-----------------------------------------------------------------------------------------
const colecaoUsuario = new ColecaoUsuarioDB();
const criptografiaProvider = new BcryptAdapter();
const tokenProvider = new JwtAdapter(process.env.SECRET_KEY as string);

const registrarUsuarioUseCase = new RegistrarUsuarioUseCase(colecaoUsuario, criptografiaProvider);
const loginUseCase = new LoginUseCase(colecaoUsuario, criptografiaProvider, tokenProvider);

new RegistrarUsuarioController(app, registrarUsuarioUseCase);
new LoginController(app, loginUseCase);

// Rotas autenticadas-------------------------------------------------------------------------------------
const salvarTransacaoUseCase = new SalvarTransacaoUseCase();
new SalvarTransacaoController(app, salvarTransacaoUseCase);
