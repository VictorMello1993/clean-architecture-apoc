import { RegistrarUsuarioUseCase } from "@core/ports/usuario/RegistrarUsuarioUseCase";
import { Express, Request, Response } from "express";

export class RegistrarUsuarioController {
  constructor(
    private servidor: Express,
    private registrarUsuarioUseCase: RegistrarUsuarioUseCase
  ) {
    servidor.post("/usuarios/registrar", async (req: Request, res: Response) => {
      try {
        const { nome, email, senha } = req.body;
        await this.registrarUsuarioUseCase.executar({ nome, email, senha });

        res.status(201).send();
      } catch (err: any) {
        res.status(400).send(err.message);
      }
    });
  }
}
