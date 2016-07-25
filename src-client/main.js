// import angular
var angular = require("angular");
// define module and require router
angular.module("festaspa", [require("angular-route")]);

var detalheconvidado = require("./convidado/detalhe");
var listaconvidado = require("./convidado/listar");
var convitesfesta = require("./festa/convites");
var detalhefesta = require("./festa/detalhe");
var listarfesta = require("./festa/listar");

var ctl = [detalheconvidado, listaconvidado, convitesfesta, detalhefesta, listarfesta];

var i = ctl.length;
while (i--) {
  var mod = ctl[i];
  angular.module("festaspa").controller(mod.controllerName, mod.controller);
}

angular.module("festaspa").config(function ($routeProvider) {
  i = ctl.length;
  while (i--) {
    var mod = ctl[i];
    $routeProvider.when(mod.route, {
      templateUrl: mod.templateUrl,
      controllerAs: mod.controllerAs,
      controller: mod.controllerName
    });
  }
  $routeProvider.otherwise("/listar-festas");
});

// require pode em qualquer altura
var serviceconvidado = require("./convidado/service");
var servicefesta = require("./festa/service");

var svc = [serviceconvidado, servicefesta];
i = svc.length;
while (i--) {
  var mod = svc[i];
  angular.module("festaspa").service(mod.serviceName, mod.service);
}
