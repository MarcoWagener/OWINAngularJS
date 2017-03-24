(function () {

    'use strict';

    app.controller('indexController', function ($scope, $location, authData) {

        $scope.logOut = function () {
            loginService.logOut();

            $location.path('/home');
        }

        $scope.authentication = authData.authenticationData;
    });
})(angular.module('app'));