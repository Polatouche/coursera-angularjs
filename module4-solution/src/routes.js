(function() {
  angular.module('MenuApp')
  .config(RoutesConfig);

  RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
  function RoutesConfig($stateProvider, $urlRouterProvider) {

    // Redirect to home page if no other URL matches
    $urlRouterProvider.otherwise('/');

    // *** Set up UI states ***
    $stateProvider

    // Home page
    .state('home', {
      url: '/',
      template: '<button ui-sref="categories">Categories</button>'
    })

    // Premade list page
    .state('categories', {
      url: '/categories',
      templateUrl: 'src/categories.template.html',
      controller: 'CategoriesController as categories',
      resolve: {
        categs: ['MenuDataService', function (MenuDataService) {
          //console.log('items:',MenuDataService.getItemsForCategory('L'));
          return MenuDataService.getAllCategories();
          //return MenuDataService.getItemsForCategory('L');
        }]
      }
    })

    // Item detail
    .state('categories.items', {
      url: '/items/{categorieId}',
      templateUrl: 'src/items.template.html',
      controller: 'ItemsController as items',
      resolve:{
        ito: ['$stateParams','MenuDataService',function ($stateParams,MenuDataService){
          console.log('ito OK');
          return MenuDataService.getItemsForCategory($stateParams.categorieId);
        }]
      }
    });

  }

}());
