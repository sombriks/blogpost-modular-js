// calling existing angular module
angular.module("festaspa").config(function ($routeProvider) {

  $routeProvider.when("/listar-convidados", {
    templateUrl: "fragments/convidado/listar.html",
    controller: "ListarConvidadosCtl",
    controllerAs: "ctl"
  });

}).controller("ListarConvidadosCtl", function (convidadoservice) {
  var self = this;
  this.convidados = [];
  convidadoservice.list().then(function (ret) {
    self.convidados = ret.data;
  });
});