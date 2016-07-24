// calling existing angular module
angular.module("festaspa").config(function ($routeProvider) {

  $routeProvider.when("/listar-festas", {
    templateUrl: "fragments/festa/listar.html",
    controller: "ListarFestasCtl",
    controllerAs: "ctl"
  });

}).controller("ListarFestasCtl", function (festaservice) {
  var self = this;
  this.festas = [];
  festaservice.list().then(function (ret) {
    self.festas = ret.data;
  });
});