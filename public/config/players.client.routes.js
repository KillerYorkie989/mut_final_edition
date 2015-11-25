// Invoke 'strict' JavaScript mode
'use strict';

// Configure the 'articles' module routes
angular.module('players').config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/players', {
            templateUrl: 'players/views/list-players.client.view.html'
        }).
        when('/players/create', {
            templateUrl: 'players/views/create-player.client.view.html'
        }).
        when('/players/:playerId', {
            templateUrl: 'players/views/view-player.client.view.html'
        }).
        when('/players/:playerId/edit', {
            templateUrl: 'players/views/edit-player.client.view.html'
        });
    }
]);