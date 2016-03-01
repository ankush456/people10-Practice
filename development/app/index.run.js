(function() {
  'use strict';

  angular
    .module('webapp')
    .run(runBlock);

  /** @ngInject */
  function runBlock(Restangular, errorcodes, authFactory, $state, $rootScope, appData ,appPopupFactory, $templateCache, userDataFactory, logCollector) {

    Restangular.setErrorInterceptor(function(response, deferred, responseHandler) {
      //Navigate to login if status and 401 and request was not from validate auth, since
      //validate auth has it's own check to move user to login.
      if (response.status === 401 && response.config.url.indexOf('validateauth') === -1) {
        authFactory.removeAuth();
        $state.go('login');
      }
      else if (response.status === 500) {
        appPopupFactory.showSimpleToast('Please Check Your Internet Connection');
      }
    });

    //$rootScope.appData = appData;
    Restangular.addFullRequestInterceptor(function(element, operation, route, url, headers, params, httpConfig) {
        
      var headerAuth = "";
      if(authFactory.getUserTokenType() && authFactory.getUserAccessToken()){
        headerAuth = authFactory.getUserTokenType() + ' ' + authFactory.getUserAccessToken();
      }


      return {
        element: element,
        params: _.extend(params, {
          //cacheval: new Date().getTime()
        }),
        //params: params,
        headers: _.extend(headers, {
          'Content-Type': 'application/json',
          'Authorization': headerAuth
        }),
        httpConfig: httpConfig
      };
    });


    Restangular.addResponseInterceptor(function(data, operation, what, url, response, deferred) {
     //console.log("A :" +what);
     //console.log("B :" +url);
     //console.log(navigator.userAgent);
     //console.log(data);
     //console.log(response.headers('content-length'));
      var logData = {
        "apiUrl": url,
        "requestTime": response.config.requestTimestamp,
        "responseTime": response.config.responseTimestamp,
        "kvPair": {
           "status":response.status ,
           "statusText":response.statusText,
           "responseMethod":response.config.method,
           "responseDataObjectSize": data.records ? data.records.length : 0,
           "responseContentLength": response.headers('content-length') || 0
        }
      };

      logCollector.log(logData);

      var extractedData = {};
      if (data.respList) {
        if (operation === "getList") {
          //if there are any error, then cross check with error layer for correct error message
          if (data.error) {
            if (data.errorList[0].code === "E05-5008" ||
              data.errorList[0].code === "E01-1002" ||
              data.errorList[0].code === "E04-4021" ||
              data.errorList[0].code === "E06-6094") {
              //A temporary fix more elaborate fix will happen when we start
              //session management for now it will show the login page to the user
              //if its session has been ended.
              //window.location = "/";
            } else {
              var message = errorcodes.getErrorMessage(data.errorList[0].code,
                response.config.params.serviceName);
              if (message) {
                appPopupFactory.showSimpleToast(message);
              }
            }
          }
          extractedData = data.respList;
          extractedData.respList = data.respList[0];
        } //End of getList if block
        else if (operation === "post") {
          var PostServiceName = what.slice(what.indexOf("=") + 1, what.length);
          if (response.data.error) {
            appPopupFactory.showSimpleToast(errorcodes.getErrorMessage(response.data.errorList[0].code, PostServiceName));
          }
          if (url.indexOf('uploadstorage') !== -1 ||
            url.indexOf('uploaddocs') !== -1 ||
            url.indexOf('createsharelink') !== -1) {
            extractedData = data;
            extractedData.respList = response.data.respList;
          } else {
            extractedData = data;
            extractedData.respList = response.data.respList[0];
          }
        } //End of post if block
        else if (operation === 'remove') {
          if (response.data.error) {
            appPopupFactory.showSimpleToast({
              message: " Error in DELETE ",
              classes: 'icon-error'
            });
          }
          extractedData = data;
          extractedData.respList = response.data.respList[0];
        } //End of remove if block
        else if (operation === 'put') {
          if (response.data.error) {
            appPopupFactory.showSimpleToast(" Error in put ");
          }
          extractedData = data;
          extractedData.respList = response.data.respList[0];
        } //End of put if block

        extractedData.error = response.data.error;
        extractedData.errorList = response.data.errorList;
        extractedData.warning = response.data.warning;
        return extractedData;
      } //End of main if block
      else { //Slow internet or internet disconnected.
        /**
        * In case copy/cut, we are getting empty response. But for copy/paste we need
        * status to know process state.
        * (200 = completed, 202 = async job started)
        */
        if(!response.data && response.status === 200 && operation === 'put'){
          response.data = {status : response.status};
        }
        extractedData = response.data;
        return extractedData;
      }

   });

    // Cache Busting of Template Cache
    //TODO: May be excute only for IE
    $rootScope.$on('$routeChangeStart', function(event, next, current) {
        if (typeof(current) !== 'undefined'){
            $templateCache.remove(current.templateUrl);
        }
    });

    /*$rootScope.$on('$viewContentLoaded', function() {
      $templateCache.removeAll();
    });*/
  }

})();
