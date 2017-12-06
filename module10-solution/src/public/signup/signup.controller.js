(function () {
'use strict';

angular.module('public')
.controller('SignUpController', SignUpController);

SignUpController.$inject = ['MenuService', 'UserInfoService'];
function SignUpController(MenuService, UserInfoService) {
  var signUpCtrl = this;

  signUpCtrl.user = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    favorite: "",
    menuItem: null
  };

  signUpCtrl.saved = false;

  signUpCtrl.submit = function () {
    MenuService.getMenuItem(signUpCtrl.user.favorite).then(function (item) {
      signUpCtrl.user.menuItem = item;
      UserInfoService.setUserInfo(signUpCtrl.user);
      signUpCtrl.saved = true;
    });
  }
}

})();