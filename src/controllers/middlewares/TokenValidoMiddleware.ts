import { IUsuarioRepository } from "@core/ports/usuario/IUsuarioRepository";
import { ITokenProvider } from "@core/ports/usuario/ITokenProvider";
import { NextFunction, Request, Response } from "express";
import { Usuario } from "@core/ports/usuario/Usuario";

export function TokenValidoMiddleware(
  colecaoUsuario: IUsuarioRepository,
  tokenProvider: ITokenProvider
) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const acessoNegado = () => res.status(403).send("Token inválido");

    try {
      const token = req.headers.authorization?.replace("Bearer ", "");

      if (!token) {
        acessoNegado();
        return;
      }

      const usuarioPayload = tokenProvider.validar(token) as Partial<Usuario>;
      const usuario = await colecaoUsuario.buscarPorId(usuarioPayload.id as string);

      if (!usuario) {
        acessoNegado();
        return;
      }

      (req as any).usuario = usuario;
      next();
    } catch (error) {
      acessoNegado();
    }
  };
}
