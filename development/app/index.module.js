(function() {
  'use strict';

  angular
    .module('webapp', [
      'restangular',
      'ui.router',
      'ct.ui.router.extras.core',
      'ct.ui.router.extras.sticky',
      'ngMaterial',
      'ngMessages',
      'ngAria',
      'ui.tree',
      'authentication',
      'appPopup',
      'ngCookies',
      'as.sortable',
      'ang-drag-drop'
    ]);

})();
