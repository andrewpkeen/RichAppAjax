(function () {
"use strict";

angular.module('common')
.service('MenuService', MenuService);


MenuService.$inject = ['$http', 'ApiPath', '$q'];
function MenuService($http, ApiPath, $q) {
  var service = this;

  // Regular expression for matching valid short names
  var nameMatcher = /^([A-Z]{1,2})(\d{1,2})$/;
  
  service.getCategories = function () {
    return $http.get(ApiPath + '/categories.json').then(function (response) {
      return response.data;
    });
  };


  service.getMenuItems = function (category) {
    var config = {};
    if (category) {
      config.params = {'category': category};
    }

    return $http.get(ApiPath + '/menu_items.json', config).then(function (response) {
      return response.data;
    });
  };

  service.getMenuItem = function (shortName) {
    shortName = shortName.toUpperCase();

    // Check if the short name is valid
    var matches = nameMatcher.exec(shortName);
    if (matches) {

      // Get all items in the category
      return service.getMenuItems(matches[1]).then(function (items) {

        // Find the specific item we're looking for
        var item = items.menu_items.find(function (item) {
          return item.short_name === shortName;
        });

        if (item) {
          // Item found, return it
          return item;
        } else {
          // Item not found, reject the promise
          return $q.reject(shortName);
        }
      });
      
    } else {
      // Invalid short name, reject it
      return $q.reject(shortName);
    }
  }

}



})();
