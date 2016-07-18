// define angular module
angular.module("festaspa", ["ngRoute"]).config(function($routeProvider){
  
  $routeProvider.when("/listar-convidados",{
    templateUrl:"fragments/convidado/listar.html",
    controller:"ListarConvidadosCtl",
    controllerAs:"ctl"
  });

  $routeProvider.when("/listar-festas",{
    templateUrl:"fragments/festa/listar.html",
    controller:"ListarFestasCtl",
    controllerAs:"ctl"
  });

  $routeProvider.when("/detalhe-convidado/:idconvidado",{
    templateUrl:"fragments/convidado/detalhe.html",
    controller:"DetalheConvidadoCtl",
    controllerAs:"ctl"
  });

  $routeProvider.when("/detalhe-festa/:idfesta",{
    templateUrl:"fragments/festa/detalhe.html",
    controller:"DetalheFestaCtl",
    controllerAs:"ctl"
  });

  $routeProvider.when("/convites-festa/:idfesta",{
    templateUrl:"fragments/festa/convites.html",
    controller:"ConvitesFestaCtl",
    controllerAs:"ctl"
  });

  $routeProvider.otherwise("/listar-festas");

}).controller("ListarConvidadosCtl",function(){

}).controller("ListarFestasCtl",function(){
  
}).controller("DetalheConvidadoCtl",function(){
  
}).controller("DetalheFestaCtl",function(){
  
}).controller("ConvitesFestaCtl",function(){
  
});