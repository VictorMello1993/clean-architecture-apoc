import { Transacao } from "@core/ports/transacao/Transacao";

const transacaoRef = {
  descricao: "Adiantamento de salário",
  valor: 1900,
  vencimento: new Date("2023-10-30"),
  idUsuario: "a9565880-3fda-46fa-9565-e2470546faf5"
} as Transacao;

export default {
  semId: transacaoRef,
  lista: [
    { ...transacaoRef, valor: 4500, descricao: "Salário" },
    { ...transacaoRef, valor: -140, descricao: "Conta de água" },
    { ...transacaoRef, valor: -380, descricao: "Conta de luz" },
    { ...transacaoRef, valor: -1500, descricao: "Fatura cartão" }
  ]
};
