(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.contoller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)

NarrowItDownController.$inject = ['MenuSearchService']
function NarrowItDownController(MenuSearchService) {
  var control = this;
}

function MenuSearchService() {
  var service = this;

  function getMatchedMenuItems(searchTerm) {
    
  }
}

})();
