import axios from "axios";
import { getAuthorizationHeaders } from "../utils/auth";

const baseUrl = process.env.API_URL;

test("Deve ser possível salvar uma transação", async () => {
  const headers = await getAuthorizationHeaders();
  const response = await axios.post(`${baseUrl}/transacoes`, {}, headers);
  expect(response.status).toBe(200);
});
