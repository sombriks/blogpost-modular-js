
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
