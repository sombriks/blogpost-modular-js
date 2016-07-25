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