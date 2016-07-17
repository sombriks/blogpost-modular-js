
exports.up = function(knex, Promise) {
  return knex("festa").insert([
    {idfesta:1,nomefesta:"House Party"},
    {idfesta:2,nomefesta:"Trance Party"},
    {idfesta:3,nomefesta:"Lounge Party"},
    {idfesta:4,nomefesta:"Reggae Party"}
  ]).then(function(){
    return knex("convidado").insert([
      {idconvidado:1,nomeconvidado:"Joe"},
      {idconvidado:2,nomeconvidado:"Mac"},
      {idconvidado:3,nomeconvidado:"Jane"},
      {idconvidado:4,nomeconvidado:"Moe"},
      {idconvidado:5,nomeconvidado:"Lucy"},
      {idconvidado:6,nomeconvidado:"Bob"},
      {idconvidado:7,nomeconvidado:"Kane"}      
    ]);
  }).then(function(){
    return knex("festa_convidado").insert([
      {idfesta:1,idconvidado:1},
      {idfesta:2,idconvidado:1},
      {idfesta:1,idconvidado:2},
      {idfesta:1,idconvidado:3},
      {idfesta:2,idconvidado:4},
      {idfesta:2,idconvidado:5},
      {idfesta:3,idconvidado:1},
      {idfesta:3,idconvidado:3},
      {idfesta:4,idconvidado:6},
      {idfesta:3,idconvidado:7}
    ]);
  });
};

exports.down = function(knex, Promise) {
  return knex("festa_convidado").del().then(function(){
    return knex("convidado").del();
  }).then(function(){
    return knex("festa").del();
  });
};
