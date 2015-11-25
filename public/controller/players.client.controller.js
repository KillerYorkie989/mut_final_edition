// Invoke 'strict' JavaScript mode
'use strict';

// Create the 'articles' controller
angular.module('players').controller('playersController', ['$scope', '$routeParams', '$location', 'Authentication', 'players',
    function($scope, $routeParams, $location, Authentication, players) {
        // Expose the Authentication service
        $scope.authentication = Authentication;

        // Create a new controller method for creating new players
        $scope.create = function() {
            // Use the form fields to create a new player $resource object
            var player = new players({
                name : this.name,
                position: this.position,
                overall: this.overall,
                speed: this.speed,
                awareness: this.awareness,
                strength: this.strength,
                agility:this.agility,
                
            });

            // Use the article '$save' method to send an appropriate POST request
            player.$save(function(response) {
                // If an article was created successfully, redirect the user to the article's page 
                $location.path('players/' + response._id);
            }, function(errorResponse) {
                // Otherwise, present the user with the error message
                $scope.error = errorResponse.data.message;
            });
        };

        // Create a new controller method for retrieving a list of players
        $scope.find = function() {
            // Use the player 'query' method to send an appropriate GET request
            $scope.players = players.query();
        };

        // Create a new controller method for retrieving a single article
        $scope.findOne = function() {
            // Use the article 'get' method to send an appropriate GET request
            $scope.player = players.get({
                playerId: $routeParams.playerId
            });
        };

        // Create a new controller method for updating a single player
        $scope.update = function() {
            // Use the article '$update' method to send an appropriate PUT request
            $scope.player.$update(function() {
                // If an article was updated successfully, redirect the user to the article's page 
                $location.path('players/' + $scope.player._id);
            }, function(errorResponse) {
                // Otherwise, present the user with the error message
                $scope.error = errorResponse.data.message;
            });
        };

        // Create a new controller method for deleting a single player
        $scope.delete = function(player) {
            // If an article was sent to the method, delete it
            if (player) {
                // Use the article '$remove' method to delete the article
                player.$remove(function() {
                    // Remove the article from the articles list
                    for (var i in $scope.players) {
                        if ($scope.players[i] === player) {
                            $scope.players.splice(i, 1);
                        }
                    }
                });
            } else {
                // Otherwise, use the article '$remove' method to delete the article
                $scope.player.$remove(function() {
                    $location.path('players');
                });
            }
        };
    }
]);