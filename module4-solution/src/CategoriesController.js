(function() {
  angular.module('MenuApp')
  .controller('CategoriesController',CategoriesController);

  CategoriesController.$inject=['MenuDataService','categs'];
  function CategoriesController(MenuDataService,categs){
    var categories = this;
    categories.categories = categs;
  };
}());
