(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// calling existing angular module

module.exports = {
  route: "/detalhe-convidado/:idconvidado",
  templateUrl: "fragments/convidado/detalhe.html",
  controllerAs: "ctl",
  controllerName: "DetalheConvidadoCtl",
  controller: function ($routeParams, convidadoservice) {
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
  }
}
},{}],2:[function(require,module,exports){
module.exports = {
  templateUrl: "fragments/convidado/listar.html",
  controllerName: "ListarConvidadosCtl",
  controllerAs: "ctl",
  route: "/listar-convidados",
  controller: function (convidadoservice) {
    var self = this;
    this.convidados = [];
    convidadoservice.list().then(function (ret) {
      self.convidados = ret.data;
    });
  }
};

},{}],3:[function(require,module,exports){

module.exports = {
  serviceName: "convidadoservice",
  service: function ($http) {
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
  }
};
},{}],4:[function(require,module,exports){

module.exports = {
  templateUrl: "fragments/festa/convites.html",
  controllerName: "ConvitesFestaCtl",
  controllerAs: "ctl",
  route: "/convites-festa/:idfesta",
  controller: function ($routeParams, festaservice, convidadoservice) {
    var self = this;
    self.festa = {};
    festaservice.find($routeParams.idfesta).then(function (ret) {
      self.festa = ret.data;
    });
  }
};

},{}],5:[function(require,module,exports){

module.exports = {
  route: "/detalhe-festa/:idfesta",
  templateUrl: "fragments/festa/detalhe.html",
  controllerName: "DetalheFestaCtl",
  controllerAs: "ctl",
  controller: function ($routeParams, festaservice) {
    var self = this;
    self.festa = {};
    festaservice.find($routeParams.idfesta).then(function (ret) {
      self.festa = ret.data;
    });
    this.dosave = function () {
      festaservice.save(self.festa).then(function (ret) {
        self.festa = ret.data;
        alert("Festa salva com sucesso!");
      });
    };
    this.dodel = function () {
      if (confirm("Deseja realmente excluir o convidado?")) {
        festaservice.del(self.festa.idfesta).then(function (ret) {
          alert("Festa excluída com sucesso!");
          self.festa = {};
        });
      }
    };
  }
};

},{}],6:[function(require,module,exports){

module.exports = {
  templateUrl: "fragments/festa/listar.html",
  controllerName: "ListarFestasCtl",
  controllerAs: "ctl",
  route: "/listar-festas",
  controller: function (festaservice) {
    var self = this;
    this.festas = [];
    festaservice.list().then(function (ret) {
      self.festas = ret.data;
    });
  }
};

},{}],7:[function(require,module,exports){
module.exports = {
  serviceName: "festaservice",
  service: function ($http) {
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
  }
};
},{}],8:[function(require,module,exports){
// define angular module
angular.module("festaspa", ["ngRoute"]);

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

},{"./convidado/detalhe":1,"./convidado/listar":2,"./convidado/service":3,"./festa/convites":4,"./festa/detalhe":5,"./festa/listar":6,"./festa/service":7}]},{},[8]);
