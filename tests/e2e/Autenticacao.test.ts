import axios from "axios";
import { Usuario } from "@ports/usuario/Usuario";

const baseUrl = process.env.API_URL;

test("Deve registrar um novo usuário se não existir", async () => {
  const usuario: Partial<Usuario> = {
    nome: "Fulano de tal",
    email: "emaildofulano@teste.com",
    senha: "123456"
  };

  try {
    const response = await axios.post(`${baseUrl}/usuarios/registrar`, usuario);
    expect(response.status).toBe(201);
  } catch (error: any) {
    expect(error.response.status).toBe(400);
    expect(error.response.data).toBe("Já existe usuário cadastrado com o e-mail informado");
  }
});
