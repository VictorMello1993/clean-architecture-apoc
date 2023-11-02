import { ExtratoMensalUseCase } from "@ports/transacao/ExtratoMensalUseCase";
import { Express, Request, Response } from "express";

export class ObterExtratoMensalController {
  constructor(
    private servidor: Express,
    private useCase: ExtratoMensalUseCase,
    ...middlewares: any[]
  ) {
    const fn = async(req: Request, res: Response) => {
      try {
        const extratoMensal = await useCase.executar({
          usuario: (req as any).usuario,
          ano: +req.params.ano,
          mes: +req.params.mes
        });
        res.status(200).json(extratoMensal);
      } catch (err: any) {
        res.status(400).send(err.message);
      }
    };
    servidor.get("/extrato/:ano/:mes", middlewares, fn);
  }
}
