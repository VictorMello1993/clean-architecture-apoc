import axios from "axios";
import usuarios from "../data/usuarios";

const baseUrl = process.env.API_URL;

test("Deve registrar um novo usuário se não existir", async () => {
  try {
    const response = await axios.post(`${baseUrl}/usuarios/registrar`, usuarios.completo);
    expect(response.status).toBe(201);
  } catch (error: any) {
    expect(error.response.status).toBe(400);
    expect(error.response.data).toBe("Já existe usuário cadastrado com o e-mail informado");
  }
});

test("Deve ser possível efetuar login com e-mail e senha válidos", async () => {
  try {
    const response = await axios.post(`${baseUrl}/usuarios/login`, usuarios.completo);
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty("token");
  } catch (error: any) {
    expect(error.response.status).toBe(403);
    expect(error.response.data).toBe("E-mail ou senha inválidos");
  }
});
