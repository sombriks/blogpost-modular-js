//
// @see http://knexjs.org/
//
// o up é executado para alterar o esquema ou o estado do banco.
exports.up = function(knex, Promise) {
  // sempre retornar um builder ou uma promessa 
  return knex.schema.createTable("convidado",function(table){
    table.increments("idconvidado");
    table.string("nomeconvidado").notNullable();
  }).createTable("festa",function(table){    
    table.increments("idfesta");
    table.string("nomefesta").notNullable();
    table.timestamp("dtfesta").notNullable().defaultTo(knex.fn.now());
  }).createTable("festa_convidado",function(table){    
    table.integer("idfesta").notNullable().references("festa.idfesta");
    table.integer("idconvidado").notNullable().references("convidado.idconvidado");
    table.timestamp("dtconvite").notNullable().defaultTo(knex.fn.now());
  }).then(function(){
    return knex.raw("create view vw_convidado as select * from convidado natural left join " + 
    "(select idconvidado, count(idfesta) as numfestas from festa_convidado group by idconvidado) t1");
  }).then(function(){
    return knex.raw("create view vw_festa as select * from festa natural left join " + 
    "(select idfesta, count(idconvidado) as numconvidados from festa_convidado group by idfesta) t1");
  });
};

// o down desfaz, sempre que possível, tudo o que o up faz.
exports.down = function(knex, Promise) {
  return knex.raw("drop view vw_festa").then(function(){
    return knex.raw("drop view vw_convidado");
  }).then(function(){
    return knex.schema.dropTable("festa_convidado")//
    .dropTable("festa")//
    .dropTable("convidado");
  })
};
