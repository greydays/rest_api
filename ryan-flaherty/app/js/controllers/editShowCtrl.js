'use strict';

module.exports = function(app) {
  app.controller('editShowCtrl', ['$location', '$http', 'Auth', function($location, $http, Auth) {

    var dis = this;
    dis.edit = false;
    dis.show = {};
    console.log(dis.show._id);

    dis.getShow = function() {
      var url = $location.path();
      url = url.split('/');
      var id = url[url.length - 1];
      $http.get('/shows/' + id).success(function(response) {
       dis.show = response;
       dis.show.date = new Date(dis.show.date);
       console.log(dis.show.date);
      });
    };

    this.putShow = function(show) {
      debugger
      $http({
        method: 'PUT',
        url: '/shows/' + dis.show._id,
        headers: {
          'Authorization': 'Token ' + Auth.getToken()
        },
        data: dis.show
      })
      .success(function (data){
        console.log(data);
        dis.edit = false;
        dis.message = "Show Updated";
      });
    };

    dis.delShow = function() {
      $http({
        method: 'DELETE',
        url: '/shows/' + dis.show._id,
        headers: {
          'Authorization': 'Token ' + Auth.getToken()
        }
      })
    };

  }]);
};
