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

test("Deve ser possível editar uma transação", async () => {
  try {
    const headers = await getAuthorizationHeaders();
    const transacaoEditada = {
      ...transacao.semId,
      id: "d77dccff-73ef-4a38-8361-76d3f9474f0d",
      descricao: "Adiantamento de salário - editada_2",
      vencimento: new Date("2023-11-15"),
      valor: 2063
    };

    const response = await axios.post(`${baseUrl}/transacoes/${transacaoEditada.id}`, transacaoEditada, headers);
    expect(response.status).toBe(200);
  } catch (error: any) {
    console.log(error.response.data);
    expect(error.response.status).toBe(400);
  }
});
