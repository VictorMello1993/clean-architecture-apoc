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
        const { descricao, valor, vencimento, idUsuario } = req.body;

        const transacao = {
          descricao,
          valor: +valor,
          vencimento: new Date(vencimento),
          idUsuario
        };

        const resultado = await this.salvarTransacaoUseCase.executar({
          transacao,
          id: req.params.id,
          usuario: (req as any).usuario
        });
        res.status(200).json(resultado);
      } catch (err: any) {
        res.status(400).send(err.message);
      }
    };
    servidor.post("/transacoes", middlewares, fn);
    servidor.post("/transacoes/:id", middlewares, fn);
  }
}
