'use strict';

var serviceBase = 'http://localhost:4312/';

var app = angular.module('app', ['ngRoute', 'LocalStorageModule']);

app.config(function ($routeProvider) {
    $routeProvider.when('/home', {
        controller: 'homeController',
        templateUrl: '/Modules/Views/home.html'
    });

    $routeProvider.when('/login', {
        controller: 'loginController',
        templateUrl: '/Modules/Views/login.html'
    });
});