// imports 
var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.json());

var cfg = require("./knexfile");
var knex = require("knex")(cfg.development);

// static files
app.use(express.static("www"));

app.get("/festa/list", function (req, res) {
  knex("vw_festa").select().then(function (ret) {
    res.send(ret);
  });
});

app.get("/festa/:idfesta", function (req, res) {
  knex("vw_festa").select().where({ idfesta: req.params.idfesta }).then(function (ret) {
    res.send(ret[0]);
  });
});

app.post("/festa/save", function (req, res) {
  var festa = req.body;
  knex("festa").insert({
    nomefesta: festa.nomefesta
  }, "idfesta").then(function (ret) {
    festa.idfesta = ret[0];
    res.send(festa);
  });
});

app.put("/festa/save", function (req, res) {
  var festa = req.body;
  knex("festa").update({
    nomefesta: festa.nomefesta
  }).where({ idfesta: festa.idfesta }).then(function (ret) {
    res.send(festa);
  })
});

app.delete("/festa/:idfesta", function (req, res) {
  knex("festa").del().where({ idfesta: req.params.idfesta }).then(function () {
    res.send("OK");
  })
});

app.get("/convidado/list", function (req, res) {
  knex("vw_convidado").select().then(function (ret) {
    res.send(ret);
  });
});

app.get("/convidado/:idconvidado", function (req, res) {
  knex("vw_convidado").select().where({ idconvidado: req.params.idconvidado }).then(function (ret) {
    res.send(ret[0]);
  });
});

app.post("/convidado/save", function (req, res) {
  var convidado = req.body;
  knex("convidado").insert(convidado, "idconvidado").then(function (ret) {
    convidado.idconvidado = ret[0];
    res.send(convidado);
  });
});

app.put("/convidado/save", function (req, res) {
  var convidado = req.body;
  knex("convidado").update(convidado).where({ idconvidado: convidado.idconvidado }).then(function (ret) {
    res.send(convidado);
  })
});

app.delete("/convidado/:idconvidado", function (req, res) {
  knex("convidado").del().where({ idconvidado: req.params.idconvidado }).then(function () {
    res.send("OK");
  })
});

app.post("/convidar", function (req, res) {
  // {idfesta:1,idconvidado:1}
  knex("festa_convidado").insert(req.body).then(function (ret) {
    res.send("OK");
  });
});

app.delete("/desconvidar/:idfesta/:idconvidado", function (req, res) {
  knex("festa_convidado").del().where({
    idconvidado: req.params.idconvidado,
    idfesta: req.params.idfesta
  }).then(function (ret) {
    res.send("OK");
  });
});

// db sanity
knex.migrate.latest().then(function () {
  console.log("App running");
  // app up and running
  app.listen(8080);
});
