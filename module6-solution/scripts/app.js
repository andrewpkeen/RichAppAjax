(function () {
'use strict';

angular.module('LunchCheck', [])

.controller('LunchCheckController', LunchCheckController)

LunchCheckController.$inject = ['$scope'];

function LunchCheckController($scope) {

  // Initialize data
  $scope.lunchMenu = "";
  $scope.tooMuchMessage = "";
  $scope.stateColor = "";

  // Button click listener
  $scope.checkIfTooMuch = function () {
    
    // Count the number of items entered
    var count = 0;
    var items = $scope.lunchMenu.split(',');
    for (var i in items) {
      if (items[i].trim()) {
        count++;
      }
    }

    if (count == 0) {
      // At least one item is required
      $scope.tooMuchMessage = "Please enter data first";
      $scope.stateColor = "red";
    } else if (count <= 3) {
      // Three or less: Enjoy!
      $scope.tooMuchMessage = "Enjoy!";
      $scope.stateColor = "green";
    } else {
      // Four or more: Too much!
      $scope.tooMuchMessage = "Too much!";
      $scope.stateColor = "green";
    }
  }
}

})();
