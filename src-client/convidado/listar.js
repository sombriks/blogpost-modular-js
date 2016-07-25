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
