// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
var users = require('../../app/controllers/users.server.controller'),
    Player = require('../../app/controllers/player.server.controller');

// Define the routes module' method
module.exports = function(app) {
    // Set up the 'articles' base routes 
    app.route('/api/player')
       .get(Player.list)
       .post(users.requiresLogin, Player.create);

    // Set up the 'articles' parameterized routes
    app.route('/api/Player/:PlayerId')
       .get(Player.read)
       .put(users.requiresLogin, Player.hasAuthorization, Player.update)
       .delete(users.requiresLogin, Player.hasAuthorization, Player.delete);

    // Set up the 'playerId' parameter middleware   
   // app.param('PlayerId', Player.PlayerByID);
};