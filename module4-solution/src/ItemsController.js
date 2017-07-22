(function() {
  angular.module('MenuApp')
  .controller('ItemsController',ItemsController);

  ItemsController.$inject=['MenuDataService','ito'];
  function ItemsController(MenuDataService,ito){
    var items = this;
    console.log('ito in controller');
    items.items = ito;
  };
}());
