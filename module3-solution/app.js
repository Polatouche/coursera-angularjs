(function() {
  var app = angular.module("NarrowItDownApp",[]);
  app.controller('NarrowItDownController',NarrowItDownController);
  app.service('MenuSearchService',MenuSearchService);
  app.directive('foundItems',FoundItemsDirective);

  NarrowItDownController.$inject=["MenuSearchService"];
  function NarrowItDownController(MenuSearchService){
    var narrowItDown = this;
    narrowItDown.found = [];
    narrowItDown.searchTerm = "";
    narrowItDown.search = function(){
      MenuSearchService.getMatchedMenuItems(narrowItDown.searchTerm).then(
        function (response){
          narrowItDown.found = response;
          //console.log('found',response);
        },
        function (response){ console.log('Error',response);}
      );
    };
    narrowItDown.onRemove = function(index){
      narrowItDown.found.splice(index,1);
    }
  }

  MenuSearchService.$inject=['$http'];
  function MenuSearchService($http){
    var service = this;
    service.getMatchedMenuItems = function(searchTerm){
      var url = "https://davids-restaurant.herokuapp.com/menu_items.json";
      /* array of items like
      {
            "id":877,
            "short_name":"A1",
            "name":"Won Ton Soup with Chicken",
            "description":"chicken-stuffed won tons in clear chicken broth with white meat chicken pieces and a few scallions",
            "price_small":2.55,
            "price_large":5.0,
            "small_portion_name":"pint",
            "large_portion_name":"quart"
         },
      */
      return  $http({ method: 'GET', url: url })
        .then(function success(response) {
          //console.log("response.data",response.data);
          if(response.data!='undefined' && angular.isArray(response.data.menu_items)){
            var aRet = response.data.menu_items.filter(function(obj){
              return (obj.description.indexOf(searchTerm) !== -1);
            });
            //console.log("aRet",aRet);
            return aRet;
          }
          else {
            return [];
          }
          // this callback will be called asynchronously
          // when the response is available
        }, function error(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
        });
      };
  }

  function FoundItemsDirective(){
    var ddo = {
      templateUrl: 'foundItems.html',
      scope: {
        items: '<',
        onRemove: '&'
      },
      controller: ListController,
      controllerAs: 'list',
      bindToController: true
    };

    return ddo;
  }

  function ListController(){
    var list=this;
  }

}());
