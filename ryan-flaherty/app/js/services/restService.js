module.exports = function(app) {
  app.factory('restService', ['$http', 'Auth', function($http, Auth) {
    const mainRoute = 'http://localhost:3000/';

    function Resource(resourceName) {
      this.resourceName = resourceName;
    }

    Resource.prototype.create = function(data) {
      return $http({
        method: 'POST',
        url: mainRoute + this.resourceName,
        headers: {
          'Authorization': 'Token ' + Auth.getToken()
        },
        data: data
      });
    };

    Resource.prototype.remove = function(data) {
      return $http({
        method: 'DELETE',
        url: mainRoute + this.resourceName + '/' + data._id,
        headers: {
          'Authorization': 'Token ' + Auth.getToken()
        },
        data: data
      });
    };

    Resource.prototype.update = function(data) {
      return $http({
        method: 'PUT',
        url: mainRoute + this.resourceName + '/' + data._id,
        headers: {
          'Authorization': 'Token ' + Auth.getToken()
        },
        data: data
      });
    };

    return function(resourceName) {
      return new Resource(resourceName);
    };
  }]);
};
