// define angular module
angular.module("festaspa", ["ngRoute"]).config(function ($routeProvider) {

  $routeProvider.when("/listar-convidados", {
    templateUrl: "fragments/convidado/listar.html",
    controller: "ListarConvidadosCtl",
    controllerAs: "ctl"
  });

  $routeProvider.when("/listar-festas", {
    templateUrl: "fragments/festa/listar.html",
    controller: "ListarFestasCtl",
    controllerAs: "ctl"
  });

  $routeProvider.when("/detalhe-convidado/:idconvidado", {
    templateUrl: "fragments/convidado/detalhe.html",
    controller: "DetalheConvidadoCtl",
    controllerAs: "ctl"
  });

  $routeProvider.when("/detalhe-festa/:idfesta", {
    templateUrl: "fragments/festa/detalhe.html",
    controller: "DetalheFestaCtl",
    controllerAs: "ctl"
  });

  $routeProvider.when("/convites-festa/:idfesta", {
    templateUrl: "fragments/festa/convites.html",
    controller: "ConvitesFestaCtl",
    controllerAs: "ctl"
  });

  $routeProvider.otherwise("/listar-festas");

}).service("convidadoservice", function ($http) {
  this.list = function () {
    return $http({
      url: "convidado/list",
      method: "GET"
    });
  };
  this.find = function (idconvidado) {
    return $http({
      url: "convidado/" + idconvidado,
      method: "GET"
    });
  };
  this.save = function (convidado) {
    return $http({
      url: "convidado/save",
      method: convidado.idconvidado ? "PUT" : "POST",
      data: JSON.stringify(convidado)
    });
  },
  this.del = function(idconvidado){
    return $http({
      url: "convidado/" + idconvidado,
      method: "DELETE"
    });
  };
}).controller("ListarConvidadosCtl", function (convidadoservice) {

  var self = this;
  this.convidados = [];
  convidadoservice.list().then(function (ret) {
    self.convidados = ret.data;
  });

}).controller("ListarFestasCtl", function () {

}).controller("DetalheConvidadoCtl", function ($routeParams, convidadoservice) {
  var self = this;
  self.convidado={};
  convidadoservice.find($routeParams.idconvidado).then(function (ret) {
    self.convidado = ret.data;
  });
  this.dosave = function () {
    convidadoservice.save(self.convidado).then(function(ret){
      self.convidado = ret.data;
      alert("Convidado salvo com sucesso!");
    });
  };
  this.dodel = function(){
    if(confirm("Deseja realmente excluir o convidado?")){
      convidadoservice.del(self.convidado.idconvidado).then(function(ret){
        alert("Convidado excluído com sucesso!");
        self.convidado = {};
      });
    }
  };
}).controller("DetalheFestaCtl", function () {

}).controller("ConvitesFestaCtl", function () {

});