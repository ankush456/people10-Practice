(function() {
  'use strict';

  angular
    .module('webapp')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider, $locationProvider) {
    /**
     * Note : All resolves are guaranteed to be resolved before transition is actually
     * performed. But the statements don't point out that resolve functions will be called
     * synchronously. And that's is correct.
     *
     * According to the ui-router source code, invocables are resolved as "parallel"
     * as possible. Only ones dependent on other invocables (either from parents or
     * from current state declaration) will be executed after their dependencies are resolved.
     *
     * So the only way to make child invocable to be invoked after parent is resolved is
     * to specify parent as dependency of child invocable.
     */
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });


    //This is done in order to add resolve property dynamically to states which don't have
    //resolve by default. This is usually the case when we have parent chilren states, parent has
    //resolve but children don't as they inherit that from parent. This is kinda hack and it
    //needs to removed after angular-ui-router upgrades to 1.0. They have add some new features
    //we can use them instead of this.
    $stateProvider.decorator('path', function(state, parentFn) {
      if (state.self.resolve === undefined) {
        state.self.resolve = {};
        state.resolve = state.self.resolve;
      }
      return parentFn(state);
    });
    $stateProvider
      .state('home', {
        url: "/home",
        controller: 'HomeController',
        templateUrl: "app/home/home.html"
      })

    $urlRouterProvider.otherwise('/home');
  }

})();
