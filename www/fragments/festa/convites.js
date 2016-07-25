
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
