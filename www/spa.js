// define angular module
angular.module("festaspa", ["ngRoute"]).config(function ($routeProvider) {

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
  };
  this.del = function (idconvidado) {
    return $http({
      url: "convidado/" + idconvidado,
      method: "DELETE"
    });
  };
}).service("festaservice", function ($http) {
  this.list = function () {
    return $http({
      url: "festa/list",
      method: "GET"
    });
  };
  this.find = function (idfesta) {
    return $http({
      url: "festa/" + idfesta,
      method: "GET"
    });
  };
  this.save = function (festa) {
    return $http({
      url: "festa/save",
      method: festa.idfesta ? "PUT" : "POST",
      data: JSON.stringify(festa)
    });
  };
  this.del = function (idfesta) {
    return $http({
      url: "festa/" + idfesta,
      method: "DELETE"
    });
  };
});