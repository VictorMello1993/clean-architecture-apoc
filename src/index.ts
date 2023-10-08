import "dotenv/config";
import express from "express";
import { ColecaoUsuarioDB } from "@adapters/db/knex/ColecaoUsuarioDB";
import { BcryptAdapter } from "@adapters/auth/BcryptAdapter";
import { RegistrarUsuarioUseCase } from "@core/ports/usuario/RegistrarUsuarioUseCase";
import { RegistrarUsuarioController } from "@controllers/RegistrarUsuarioController";

export const app = express();

const porta = process.env.API_PORT ?? 3001;
// const router = Router();
// const usuariosRouter = Router();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.listen(porta, () => console.log(`Server is running at port ${porta}...`));

// router.use("/usuarios", usuariosRouter);

// Rotas abertas-----------------------------------------------------------------------------------------
const colecaoUsuario = new ColecaoUsuarioDB();
const criptografiaProvider = new BcryptAdapter();
const registrarUsuarioUseCase = new RegistrarUsuarioUseCase(colecaoUsuario, criptografiaProvider);
new RegistrarUsuarioController(app, registrarUsuarioUseCase);

// usuariosRouter.post("/registrar", registrarUsuarioController.handle);

// Rotas autenticadas-------------------------------------------------------------------------------------
