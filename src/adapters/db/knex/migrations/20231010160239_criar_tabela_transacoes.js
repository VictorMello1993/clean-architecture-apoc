/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  const tabelaExiste = await knex.schema.hasTable("transacoes");

  if (tabelaExiste) return;

  return knex.schema.createTable("transacoes", table => {
    table.uuid("id").primary();
    table.string("descricao").notNullable();
    table.string("valor").notNullable();
    table.string("vencimento").notNullable().defaultTo(knex.fn.now());
    table.uuid("usuario_id").references("id").inTable("usuarios").notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists("transacoes");
};
