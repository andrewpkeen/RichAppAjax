(function () {
'use strict';

angular.module('MenuApp').component('categories', {
  templateUrl: "src/menuapp/categories.component.html",
  bindings: {
    categories: '<'
  }
});

})();
