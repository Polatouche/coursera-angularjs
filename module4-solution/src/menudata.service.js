(function() {
  angular.module("data")
  .service('MenuDataService',MenuDataService);

  MenuDataService.$inject = ['$http'];
  function MenuDataService($http){
    var service = this;

    service.getAllCategories = function(){
      var url = "https://davids-restaurant.herokuapp.com/categories.json";
      return $http({
        method:'GET',
        url : url
      }).then(
        function success(result){
          return result.data;
        },
        function error(result){
          console.log('Error',result);
          return result;
        }
      );
    };

    service.getItemsForCategory = function(categoryShortName){
      var url="https://davids-restaurant.herokuapp.com/menu_items.json";
      return $http({
        method:'GET',
        url : url,
        params : {category:categoryShortName}
      }).then(
        function success(result){
          return result.data.menu_items;
        },
        function error(result){
          console.log('Error',result);
          return result;
        }
      );
    };
  }
}());
