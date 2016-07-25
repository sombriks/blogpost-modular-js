// import angular
import angular from 'angular';
import ngRoute from 'angular-route';
console.debug(ngRoute);
// define module and require router
angular.module("festaspa", ["ngRoute"]);


import detalheconvidado from  "./convidado/detalhe";
import listaconvidado from "./convidado/listar";
import convitesfesta from "./festa/convites";
import detalhefesta from "./festa/detalhe";
import listarfesta from "./festa/listar";

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
import serviceconvidado from "./convidado/service";
import servicefesta from "./festa/service";

var svc = [serviceconvidado, servicefesta];
i = svc.length;
while (i--) {
  var mod = svc[i];
  angular.module("festaspa").service(mod.serviceName, mod.service);
}
