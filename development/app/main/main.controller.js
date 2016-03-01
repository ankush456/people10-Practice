(function() {
  'use strict';

  angular
    .module('webapp')
    .controller('MainController', MainController);


  /** @ngInject */
  function MainController($scope, $location, $mdSidenav, authFactory) {
    $scope.showPageLayout = false;
    var originatorEv;

    this.openMenu = function($mdOpenMenu, ev) {
      originatorEv = ev;
      $mdOpenMenu(ev);
    };

    var originatorEv;

    $scope.openMenu = function($mdOpenMenu, ev) {
      originatorEv = ev;
      $mdOpenMenu(ev);
    };

    $scope.openNav = function(nav){
      $mdSidenav(nav).toggle();
    }

    $scope.loggedIn = true;

     $scope.CheckCurrPage = function(page) {
          var currentRoute = $location.path().substring(1);
          return (page === currentRoute) && !$scope.showPageLayout ? 'loginHideNavbar' : '';
      };

    $scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
    $scope.data = [300, 500, 100];

    $scope.barLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
    $scope.barSeries = ['Series A', 'Series B'];

     $scope.barData = [
       [65, 59, 80, 81, 56, 55, 40],
       [28, 48, 40, 19, 86, 27, 90]
     ];

     $scope.radarLabels =["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"];

     $scope.radarData = [
       [65, 59, 90, 81, 56, 55, 40],
       [28, 48, 40, 19, 96, 27, 100]
     ];

     $scope.type = 'PolarArea';
     $scope.toggleChart = function () {
      $scope.type = $scope.type === 'PolarArea' ?
        'Pie' : 'PolarArea';
    };

    $scope.isOpen = false;
    $scope.hideSideNav = false;

    $scope.$on('HIDE_NAV',function(){
      $scope.hideSideNav = true;
    });

    $scope.$on('SHOW_NAV',function(){
      $scope.hideSideNav = false;
    });

    //This block is written to reset variables on state change. Exaxmpl: logout  -> login withput page refresh
    $scope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
        /*$scope.showPageLayout = (toState.name === 'login' ||
                                 fromState.name === 'login' ||
                                 !fromState.name) ? false : true;*/
        authFactory.setRequestedUrl(toState.name, toParams);
    });

    $scope.$on('$stateChangeSuccess',function(event, toState, toParams, fromState, fromParams) {
        $scope.showPageLayout = (toState.name !== 'login') ? true : false;
    });
  }
})();
