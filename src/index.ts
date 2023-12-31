import "dotenv/config";
import { SalvarTransacaoUseCase } from "@core/ports/transacao/SalvarTransacaoUseCase";
import express from "express";
import { BcryptAdapter } from "@adapters/auth/BcryptAdapter";
import { RegistrarUsuarioUseCase } from "@core/ports/usuario/RegistrarUsuarioUseCase";
import { RegistrarUsuarioController } from "@controllers/RegistrarUsuarioController";
import { LoginUseCase } from "@core/ports/usuario/LoginUseCase";
import { LoginController } from "@controllers/LoginController";
import { JwtAdapter } from "@adapters/auth/JwtAdapter";
import { SalvarTransacaoController } from "@controllers/SalvarTransacaoController";
import { TokenValidoMiddleware } from "@controllers/middlewares/TokenValidoMiddleware";
import { ColecaoTransacaoDB } from "@adapters/db/ColecaoTransacaoDB";
import { ColecaoUsuarioDB } from "@adapters/db/ColecaoUsuarioDB";
import { ExtratoMensalUseCase } from "./core/ports/transacao/ExtratoMensalUseCase";
import { ObterExtratoMensalController } from "./controllers/ObterExtratoMensalController";

export const app = express();

const porta = process.env.API_PORT ?? 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.listen(porta, () => console.log(`Server is running at port ${porta}...`));

// Rotas abertas-----------------------------------------------------------------------------------------
const colecaoUsuario = new ColecaoUsuarioDB();
const colecaoTransacao = new ColecaoTransacaoDB();
const criptografiaProvider = new BcryptAdapter();
const tokenProvider = new JwtAdapter(process.env.SECRET_KEY as string);

const registrarUsuarioUseCase = new RegistrarUsuarioUseCase(colecaoUsuario, criptografiaProvider);
const loginUseCase = new LoginUseCase(colecaoUsuario, criptografiaProvider, tokenProvider);

new RegistrarUsuarioController(app, registrarUsuarioUseCase);
new LoginController(app, loginUseCase);

// Rotas autenticadas-------------------------------------------------------------------------------------
const salvarTransacaoUseCase = new SalvarTransacaoUseCase(colecaoTransacao);
const extratoMensalUseCase = new ExtratoMensalUseCase(colecaoTransacao);
const tokenValidoMiddleware = TokenValidoMiddleware(colecaoUsuario, tokenProvider);
new SalvarTransacaoController(app, salvarTransacaoUseCase, tokenValidoMiddleware);
new ObterExtratoMensalController(app, extratoMensalUseCase, tokenValidoMiddleware);
