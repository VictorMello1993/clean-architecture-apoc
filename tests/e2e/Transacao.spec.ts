import axios from "axios";
import { getAuthorizationHeaders } from "../utils/auth";
import transacao from "../data/transacao";

const baseUrl = process.env.API_URL;

test("Deve ser possível salvar uma transação", async () => {
  try {
    const headers = await getAuthorizationHeaders();
    const response = await axios.post(`${baseUrl}/transacoes`, transacao.semId, headers);
    expect(response.status).toBe(200);
  } catch (error: any) {
    console.log(error.response.data);
    expect(error.response.status).toBe(400);
  }
});
