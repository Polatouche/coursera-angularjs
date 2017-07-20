(function () {
'use strict';

var app = angular.module('ShoppingListCheckOff', []);
app.controller('ToBuyController', ToBuyController);
app.controller('AlreadyBoughtController', AlreadyBoughtController);
app.service('ShoppingListCheckOffService',ShoppingListCheckOffService);

function ShoppingListCheckOffService(){
    var service = this;
    var toBuyItems = [
      { name: "Milk",       quantity: "2" },
      { name: "Donuts",     quantity: "3" },
      { name: "Cookies",    quantity: "300" },
      { name: "Bananas",    quantity: "20" },
      { name: "Chocolate",  quantity: "500" }
    ];
    var boughtItems = [];
    service.getToBuyItems = function(){
      return toBuyItems;
    };
    service.getBoughtItems = function(){
      return boughtItems;
    };
    service.buy = function(index){
      boughtItems.push(toBuyItems.splice(index,1)[0]);
    };
}

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var toBuy = this;
  toBuy.items = ShoppingListCheckOffService.getToBuyItems();
  toBuy.buy = function(index){
    ShoppingListCheckOffService.buy(index);
  }
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var bought = this;
  bought.items = ShoppingListCheckOffService.getBoughtItems();
}

})();
