// calling existing angular module
angular.module("festaspa").config(function ($routeProvider) {

  $routeProvider.when("/convites-festa/:idfesta", {
    templateUrl: "fragments/festa/convites.html",
    controller: "ConvitesFestaCtl",
    controllerAs: "ctl"
  });

}).controller("ConvitesFestaCtl", function ($routeParams, festaservice, convidadoservice) {
  var self = this;
  self.festa = {};
  festaservice.find($routeParams.idfesta).then(function (ret) {
    self.festa = ret.data;
  });
})