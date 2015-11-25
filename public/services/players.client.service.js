// Invoke 'strict' JavaScript mode
'use strict';

// Create the 'articles' service
angular.module('player').factory('Player', ['$resource', function($resource) {
    // Use the '$resource' service to return an article '$resource' object
    return $resource('api/player/:playerId', {
        playerId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);