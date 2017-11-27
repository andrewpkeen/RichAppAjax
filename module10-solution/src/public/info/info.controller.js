(function () {
'use strict';

angular.module('public')
.controller('InfoController', InfoController);

InfoController.$inject = ['UserInfoService'];
function InfoController(UserInfoService) {
  var infoCtrl = this;

  infoCtrl.userInfo = UserInfoService.getUserInfo();
}

})();
  