import axios from "axios";

const baseUrl = process.env.API_URL;

test("Deve ser possível salvar uma transação", async () => {
  const response = await axios.post(`${baseUrl}/transacoes`);
  expect(response.status).toBe(200);
});
