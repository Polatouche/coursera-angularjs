(function () {
"use strict";

angular.module('common')
.service('MenuService', MenuService);


MenuService.$inject = ['$http', 'ApiPath'];
function MenuService($http, ApiPath) {
  var service = this;

  service.getCategories = function () {
    return $http.get(ApiPath + '/categories.json').then(function (response) {
      return response.data;
    });
  };


  service.getMenuItems = function (category) {
    var config = {};
    if (category) {
      config.params = {'category': category};
    }

    return $http.get(ApiPath + '/menu_items.json', config).then(function (response) {
      return response.data;
    });
  };
  
  service.getMenuItem = function (shortName){
    //console.log('getMenuItem search for ',shortName);
    return $http.get(ApiPath + '/menu_items/'+shortName+'.json').then(
      function (response) {
        console.log('getMenuItem -> success ',response);
        if (response.status == '500') return false;
        return response.data;
      },
      function (response) {
        console.log('getMenuItem -> failed ',response);
        return false;
      },
    );
  };

}



})();
