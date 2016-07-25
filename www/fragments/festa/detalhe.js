
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
