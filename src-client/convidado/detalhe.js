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