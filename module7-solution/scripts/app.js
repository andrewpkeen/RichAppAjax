(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService)
.filter('price', PriceFilter);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var toBuy = this;

  toBuy.items = ShoppingListCheckOffService.getItemsToBuy();

  toBuy.nothingLeft = function () {
    return toBuy.items.length == 0;
  };

  // Notify the service that an item was bought
  toBuy.bought = function (index) {
    ShoppingListCheckOffService.buyItem(index);
  };
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var bought = this;

  bought.items = ShoppingListCheckOffService.getBoughtItems();

  bought.nothingYet = function () {
    return bought.items.length == 0;
  };
}

function ShoppingListCheckOffService() {
  var service = this;

  var itemsToBuy = [
    { name: "bags of cookies", quantity: 10, pricePerItem: 2.50 },
    { name: "pounds of bacon", quantity: 3, pricePerItem: 5.00 },
    { name: "chickens", quantity: 2, pricePerItem: 7.99 },
    { name: "eggs", quantity: 12, pricePerItem: 0.30 },
    { name: "potatoes", quantity: 6, pricePerItem: 0.60 }
  ];

  var boughtItems = [];

  service.getItemsToBuy = function () {
    return itemsToBuy;
  };

  service.getBoughtItems = function () {
    return boughtItems;
  };

  service.buyItem = function (index) {
    // Remove this one item from the to-buy list
    var item = itemsToBuy.splice(index, 1);
    // Add it to the bought list
    boughtItems.push(item[0]);
  };
}

// Extend the angular currency filter to use 3 dollar signs
PriceFilter.$inject = ['$filter']
function PriceFilter($filter) {
  return function (input) {
    return "$$" + $filter('currency')(input, "$", 2)
  }
}

})();
