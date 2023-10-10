import { Express, Request, Response } from "express";
import { SalvarTransacaoUseCase } from "@core/ports/transacao/SalvarTransacaoUseCase";

export class SalvarTransacaoController {
  constructor(
    private servidor: Express,
    private salvarTransacaoUseCase: SalvarTransacaoUseCase,
    ...middlewares: any[]
  ) {
    const fn = async(req: Request, res: Response) => {
      try {
        const resultado = await this.salvarTransacaoUseCase.executar();
        res.status(200).json(resultado);
      } catch (err: any) {
        res.status(400).send(err.message);
      }
    };
    servidor.post("/transacoes", middlewares, fn);
  }
}
