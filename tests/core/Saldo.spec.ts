import { Saldo } from "@core/ports/transacao/Saldo";
import transacao from "../data/transacao";
const transacoes = [
  { ...transacao.semId, valor: 1900 },
  { ...transacao.semId, valor: -700 },
  { ...transacao.semId, valor: -200 },
  { ...transacao.semId, valor: 1000 }
];

test("Deve calcular total das transações", () => {
  expect(new Saldo(transacoes).total).toBe(2000);
});

test("Deve calcular total das receitas", () => {
  expect(new Saldo(transacoes).receitas).toBe(2900);
});

test("Deve calcular total das despesas", () => {
  expect(new Saldo(transacoes).despesas).toBe(900);
});
