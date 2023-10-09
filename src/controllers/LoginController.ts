import { Express, Request, Response } from "express";
import { LoginUseCase } from "@core/ports/usuario/LoginUseCase";

export class LoginController {
  constructor(
    private servidor: Express,
    private loginUseCase: LoginUseCase
  ) {
    servidor.post("/usuarios/login", async (req: Request, res: Response) => {
      try {
        const { email, senha } = req.body;
        const token = await this.loginUseCase.executar(email, senha);

        res.status(200).json({ token });
      } catch (err: any) {
        res.status(403).send(err.message);
      }
    });
  }
}
