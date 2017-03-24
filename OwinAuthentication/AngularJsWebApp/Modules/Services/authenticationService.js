(function () {
    'use strict';

    app.service('authenticationService', function ($http, $q, $window) {
        var tokenInfo;

        var setTokenInfo = function (data) {
            tokenInfo = data;
            $window.sessionStorage['TokenInfo'] = JSON.stringify(tokenInfo);
        }

        var getTokenInfo = function () {
            return tokenInfo;
        }

        var removeToken = function () {
            tokenInfo = null;
            $window.sessionStorage['TokenInfo'] = null;
        }

        var init = function () {
            if ($window.sessionStorage['TokenInfo']) {
                tokenInfo = JSON.parse($window.sessionStorage['TokenInfo']);
            }
        }

        var setHeader = function (http) {
            delete http.defaults.headers.common['X-Requested-With'];

            if ((tokenInfo != undefined) && (tokenInfo.accessToken != undefined) && (tokenInfo.accessToken != null) && (tokenInfo.accessToken != "")) {
                http.defaults.headers.common['Authorization'] = 'Bearer ' + tokenInfo.accessToken;
                http.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
            }
        }

        var validateRequest = function () {
            var url = serviceBase + 'api/TestMethod';
            var deferred = $q.defer();

            $http.get(url).then(function () {
                deferred.resolve(null);
            }, function (error) {
                deferred.reject(error);
            });

            return deferred.promise;
        }

        return {
            setTokenInfo: this.setTokenInfo,
            getTokenInfo: this.getTokenInfo,
            removeToken: this.removeToken,
            init: this.init,
            setHeader: this.setHeader,
            validateRequest: this.validateRequest
        }
    });
})(angular.module('app'));