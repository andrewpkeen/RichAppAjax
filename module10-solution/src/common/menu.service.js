(function () {
"use strict";

angular.module('common')
.service('MenuService', MenuService);


MenuService.$inject = ['$http', 'ApiPath', '$q'];
function MenuService($http, ApiPath, $q) {
  var service = this;

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
    var matches = nameMatcher.exec(shortName);
    if (matches) {
      return service.getMenuItems(matches[1]).then(function (items) {
        var item = items.menu_items.find(function (item) {
          return item.short_name === shortName;
        });
        if (item) {
          return item;
        } else {
          return $q.reject(shortName);
        }
      });
    } else {
      return $q.reject(shortName);
    }
  }

}



})();
