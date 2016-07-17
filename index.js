// imports 
var express = require("express");
var app     = express();

var cfg     = require("./knexfile");
var knex    = require("knex")(cfg.development);

// static files
app.use(express.static("www"));

// db sanity
knex.migrate.latest().then(function(){
  
  // app up and running
  app.listen(8080);
});
