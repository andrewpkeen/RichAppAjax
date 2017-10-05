(function () {
'use strict';

angular.module('LunchCheck', [])

.controller('LunchCheckController', LunchCheckController)

LunchCheckController.$inject = ['$scope'];

function LunchCheckController($scope) {
  $scope.lunchMenu = "";
  $scope.tooMuchMessage = "";
  $scope.checkIfTooMuch = function () {
    if ($scope.lunchMenu) {
      var count = 0;
      var items = $scope.lunchMenu.split(',');
      for (var i in items) {
        if (items[i].trim()) {
          count++;
        }
      }
      if (count <= 3) {
        $scope.tooMuchMessage = "Enjoy!";
      } else {
        $scope.tooMuchMessage = "Too much!";
      }
    } else {
      $scope.tooMuchMessage = "Please enter data first";
    }
  }
}

})();