(function () {
  'use strict';

  angular
    .module('webapp')
    .controller('HomeController', HomeController);

  /** @ngInject */
  function HomeController($scope, $mdSidenav, $http) {
    $scope.isSidenavOpen = false;
    $scope.openLeftMenu = function () {
      $mdSidenav('left').toggle();
    };
    $scope.percent=[];

//listed goals
    $scope.goals =
      [{
        id: 1,
        start_date: '2015-12-1',
        end_date: '2016-12-1',
        amount: 80000,
        description: 'Buy a bike',
        amout_saved: 12536
      }, {
        id: 2,
        start_date: '2015-8-1',
        end_date: '2016-8-1',
        amount: 60000,
        description: 'Buy a Laptop',
        amout_saved: 35010

      }, {
        id: 2,
        start_date: '2015-8-1',
        end_date: '2016-8-1',
        amount: 60000,
        description: 'Buy a Laptop',
        amout_saved: 35010

      }, {
        id: 2,
        start_date: '2015-8-1',
        end_date: '2016-8-1',
        amount: 60000,
        description: 'Buy a Laptop',
        amout_saved: 35010

      }, {
        id: 2,
        start_date: '2015-8-1',
        end_date: '2016-8-1',
        amount: 60000,
        description: 'Buy a Laptop',
        amout_saved: 35010

      }, {
        id: 2,
        start_date: '2015-8-1',
        end_date: '2016-8-1',
        amount: 60000,
        description: 'Buy a Laptop',
        amout_saved: 35010

      }, {
        id: 2,
        start_date: '2015-8-1',
        end_date: '2016-8-1',
        amount: 60000,
        description: 'Buy a Laptop',
        amout_saved: 35010

      }];

      for(var i=0;i<$scope.goals.length;i++){
        var total= $scope.goals[i].amount;
        var amount_saved=$scope.goals[i].amout_saved;
        $scope.goals[i].percent=(Math.floor((amount_saved / total) * 100));
        total += $scope.goals[i].amout_saved;
      }
    $scope.totalAmountSaved=total;

    $scope.totalGoals=$scope.goals.length;


  //Speed dial options

    this.topDirections = ['left', 'up'];
    this.bottomDirections = ['down', 'right'];
    this.isOpen = false;
    this.availableModes = ['md-fling', 'md-scale'];
    this.selectedMode = 'md-fling';
    this.availableDirections = ['up', 'down', 'left', 'right'];
    this.selectedDirection = 'up';



  }






})();
