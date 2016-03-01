(function() {
  'use strict';

  angular
    .module('webapp')
    .controller('LoginController', LoginController);

  /** @ngInject */
  function LoginController($scope, appPopupFactory, authFactory) {
    $scope.submitted = false;

    $scope.loginUI = true;
    $scope.recoveryUI = false;

    $scope.loadRecovery = function() {
      $scope.loginUI = false;
      $scope.recoveryUI = true;
    };

    $scope.loadLogin = function() {
      $scope.loginUI = true;
      $scope.recoveryUI = false;
    };

    $scope.login = function() {
      //login
      if ($scope.loginUI) {
        authFactory.login({
            userId: $scope.username.toLowerCase(),
            password: $scope.password
          })
          .then(function() {
              appPopupFactory.showSimpleToast(authFactory.getAuthMessage());
            },
            function() {
              appPopupFactory.showSimpleToast(authFactory.getAuthMessage(), 'failure');
            });
      } else if ($scope.recoveryUI) { //recovery
        console.log("Forgot password : " + $scope.username.toLowerCase());
      }
    };

  }

})();
