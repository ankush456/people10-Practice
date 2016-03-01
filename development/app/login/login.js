(function() {
    'use strict';

    /**
     * @ngdoc function
     * @name webapp.controller:LoginCtrl
     * @description
     * # LoginCtrl
     * Controller of the webapp
     */

    var loginModule = angular.module('loginModule', [])
        .controller('LoginCtrl', LoginCtrl);

    function LoginCtrl($scope, $auth, appFunctions) {
        $scope.login = function() {
            $auth.login({
                    userName: $scope.username,
                    password: $scope.password
                })
                .then(function() {
                    //$auth.getUserProfile($scope.username);
                    appFunctions.LogEvent("login");
                    appPopupFactory.showSimpleToast($auth.getMessage());
                })
                .catch(function(response) {
                    console.log(response);
                });
        };

    };
})();
