(function() {
  'use strict';
  var app = angular.module('LunchCheck',[]);
  app.controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject = ["$scope"];
  function LunchCheckController($scope){
      //$scope.by = 'Antoine Polatouche';
      $scope.menu="";
      $scope.message="";
      $scope.check = function(){
        if($scope.menu=='') {
          $scope.message = "Please enter data first";
        }
        else {
          $scope.message=checkMenu($scope.menu);
        }
      };
      function checkMenu(menu){
        var msg = "Enjoy!";
        var items = menu.split(',');
        if(items.length>3) msg = "Too much!";
        return msg;
      }
  };
}());
