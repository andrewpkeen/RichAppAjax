(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective);

function FoundItemsDirective() {
  return {
    restrict: 'E',
    templateUrl: 'founditems.html',
    scope: {
      items: '<',
      showNothingFound: '<',
      onRemove: '&'
    }
  };
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var control = this;

  control.searchTerm = "";
  control.found = [];
  control.nothingFound = false;

  control.narrowItDown = function () {
    if (control.searchTerm.length === 0) {
      control.nothingFound = true;
      control.found = [];
      return;
    }

    var promise = MenuSearchService.getMatchedMenuItems(control.searchTerm);
    promise.then(function (result) {
      control.found = result;
      control.nothingFound = control.found.length === 0;
    });
  };

  control.remove = function (index) {
    control.found.splice(index, 1);
  };
}

MenuSearchService.$inject = ['$http'];
function MenuSearchService($http) {
  var service = this;

  service.getMatchedMenuItems = function(searchTerm) {
    return $http({
      method: 'GET',
      url: "https://davids-restaurant.herokuapp.com/menu_items.json"
    }).then(function (result) {
      return result.data.menu_items.filter(function (item) {
        return item.description.indexOf(searchTerm) !== -1;
      });
    });
  };
}

})();
