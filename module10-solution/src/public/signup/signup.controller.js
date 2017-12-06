(function () {
'use strict';

angular.module('public')
.controller('SignUpController', SignUpController);

SignUpController.$inject = ['MenuService', 'UserInfoService'];
function SignUpController(MenuService, UserInfoService) {
  var signUpCtrl = this;

  var nameMatcher = /^([A-Z]{1,2})(\d{1,2})$/;

  function handleFavoriteFailure() {

  }

  signUpCtrl.user = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    favorite: "",
    menuItem: null
  };

  signUpCtrl.submit = function () {
    signUpCtrl.user.favorite = signUpCtrl.user.favorite.toUpperCase();
    var matches = nameMatcher.exec(signUpCtrl.user.favorite);
    if (matches) {
      var category = matches[1];
      MenuService.getMenuItems(category).then(function (items) {
        var item = items.menu_items.find(function (item) {
          return item.short_name === signUpCtrl.user.favorite;
        });
        if (item) {
          // Success
          signUpCtrl.user.menuItem = item;
          UserInfoService.setUserInfo(signUpCtrl.user);
        } else {
          // Failure
          handleFavoriteFailure();
        }
      }).catch(function (error) {
        // Failure
        handleFavoriteFailure();
      });
    } else {
      // Failure
      handleFavoriteFailure();
    }
  }
}

})();