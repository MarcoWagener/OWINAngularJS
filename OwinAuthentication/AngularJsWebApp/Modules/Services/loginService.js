(function () {
    'use strict';

    app.service('loginService', function ($http, $q, authenticationService, authData) {
        var vm = this;

        var userInfo;
        var loginServiceUrl = serviceBase + 'oauth/token';
        var deviceInfo = [];
        var deferred;

        vm.login = function (userName, password) {
            deferred = $q.deferred;

            var data = 'grant_type=password&username=' + userName + '&password=' + password;

            $http.post(loginServiceUrl, data, {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            })
            .success(function (response) {
                var o = response;

                userInfo = {
                    accessToken: response.access_token,
                    userName: response.userName
                };

                authenticationService.setTokenInfo(userInfo);
                authData.authenticationData.isAuthenticated = true;
                authData.authenticationData.userName = respons.userName;

                deferred.resolve(null);
            })
            .error(function (err, status) {
                authData.authenticationData.isAuthenticated = false;
                authData.authenticationData.userName = '';

                deferred.resolve(err);
            });

            return deferred.promise;
        }

        vm.logOut = function () {
            authenticationService.removeToken();
            authData.authenticationData.isAuthenticated = false;
            authData.authenticationData.userName = "";
        }
    });
})(angular.module('app'));