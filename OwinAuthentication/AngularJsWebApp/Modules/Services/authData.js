'use strict';

app.factory('authData', [function () {
    var authDataFactory = {};

    var _authentication = {
        isAuthenticated: false,
        userName: ''
    };

    authDataFactory.authenticationData = _authentication;

    return authDataFactory;
}]);