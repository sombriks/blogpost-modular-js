
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