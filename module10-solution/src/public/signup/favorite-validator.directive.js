(function () {
'use strict';

angular.module('public')
.directive('favoriteValidator', FavoriteValidatorDirective);

FavoriteValidatorDirective.$inject = ['MenuService'];
function FavoriteValidatorDirective(MenuService) {
  return {
    require: 'ngModel',
    link: function (scope, element, attr, favCtrl) {
      function parseFavorite(favorite) {
        favorite = favorite.toUpperCase();

        MenuService.getMenuItem(favorite).then(function (item) {
          favCtrl.$setValidity('itemExists', true);
        }).catch(function (reason) {
          favCtrl.$setValidity('itemExists', false);
        });

        return favorite;
      }
      favCtrl.$parsers.push(parseFavorite);
    }
  };
}

})();
