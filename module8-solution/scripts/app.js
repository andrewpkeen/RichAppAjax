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
      loading: '<',
      items: '<',
      message: '<',
      onRemove: '&'
    }
  };
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var control = this;

  control.searchTerm = "";
  control.loading = false;
  control.found = [];
  control.message = "";

  control.narrowItDown = function () {

    // Clear the list of found items
    control.found = [];
    
    if (control.searchTerm.length === 0) {
      // If the search term is empty, report nothing found
      control.message = "Nothing found";
    } else {
      // Get the search results from the service
      control.message = "";
      control.loading = true;
      var promise = MenuSearchService.getMatchedMenuItems(control.searchTerm);
      promise.then(function (result) {
        // Success, capture the results
        control.found = result;
        control.loading = false;
        if (control.found.length === 0) {
          control.message = "Nothing found"
        }
      }).catch(function (error) {
        // Error! Tell the user.
        control.message = "Server error!"
        control.loading = false;
      });
    }
  };

  // Function to remove menu item at given index from found array
  control.remove = function (index) {
    control.found.splice(index, 1);
  };
}

MenuSearchService.$inject = ['$http'];
function MenuSearchService($http) {
  var service = this;

  // Function to get the items from web service and filter on the search term
  service.getMatchedMenuItems = function(searchTerm) {
    return $http({
      method: 'GET',
      url: "https://davids-restaurant.herokuapp.com/menu_items.json"
    }).then(function (result) {
      searchTerm = searchTerm.toLowerCase()
      return result.data.menu_items.filter(function (item) {
        return item.description.toLowerCase().indexOf(searchTerm) !== -1;
      });
    });
  };
}

})();
