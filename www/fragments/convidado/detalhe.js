// calling existing angular module
angular.module("festaspa").config(function ($routeProvider) {

  $routeProvider.when("/detalhe-convidado/:idconvidado", {
    templateUrl: "fragments/convidado/detalhe.html",
    controller: "DetalheConvidadoCtl",
    controllerAs: "ctl"
  });

}).controller("DetalheConvidadoCtl", function ($routeParams, convidadoservice) {
  var self = this;
  self.convidado = {};
  convidadoservice.find($routeParams.idconvidado).then(function (ret) {
    self.convidado = ret.data;
  });
  this.dosave = function () {
    convidadoservice.save(self.convidado).then(function (ret) {
      self.convidado = ret.data;
      alert("Convidado salvo com sucesso!");
    });
  };
  this.dodel = function () {
    if (confirm("Deseja realmente excluir o convidado?")) {
      convidadoservice.del(self.convidado.idconvidado).then(function (ret) {
        alert("Convidado excluído com sucesso!");
        self.convidado = {};
      });
    }
  };
});