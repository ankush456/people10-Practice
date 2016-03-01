(function() {
    'use strict';

    angular.module('webapp')
        .service('logCollector', function($http, userDataFactory) {
            //var logUrl = "https://52.7.44.174:8443/linkedin-1.0-SNAPSHOT/recordtime";
            var logUrl = "/linkedin-1.0-SNAPSHOT/recordtime";
            this.log = function(data) {

              data.kvPair.loggedInUserEmailId = userDataFactory.getUserEmail();
                //console.log(data);

                $http.post(logUrl, data).then(function(response) {});
            };

            //console.log(logData);
            //console.log('The request took ' + url +"   "+(time/ 1000 ) + ' seconds.');
            //console.log("API: " + what + "Request Time: "+ response.config.requestTimestamp+"Response Time: "+ response.config.responseTimestamp+"Total: "+(time/ 1000 ) + ' seconds.');
        });
})();
