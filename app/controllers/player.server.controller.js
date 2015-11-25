// Invoke 'strict' JavaScript mode
'use strict';

//Load player module dependencies 
var Player= require("mongoose").model('Player');

//Creatte a new error handling controller method
var getErrorMessage = function(err) 
{
    if (err.error) {
        for (var errName in err.error)
        {
            if(err.error[errName].message)
            return err.error[errName].message;
            }
        } else {
        return 'Unknown server error';
    }
};
// Create a new controller method that creates new players
exports.create = function(req, res) {
    // Create a new player object
    var player = new Player(req.body);
    
    //Set the player's 'creator' property
    player.creator = req.user;
    
    // try Saving the player
    player.save(function(err) {
        if (err){
            // if an error occurs sent the error message
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else{
               // Send a JSON representation of the article 
            res.json(player);
        }
    });
};

// Create a new controller method that retrieves a list of players
exports.list = function(req, res) {
    // Use the model 'find' method to get a list of players
    Player.find().sort('-position').populate('name').exec(function(err, articles) {
        if (err) {
            // If an error occurs send the error message
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            // Send a JSON representation of the article 
            res.json(Player);
        }
    });
};
// Create a new controller method that returns an existing player
exports.read = function(req, res) {
    res.json(req.player);
};

// Create a new controller method that updates an existing player
exports.update = function(req, res) {
    // Get the player from the 'request' object
    var player = req.player;

    // Update the article fields
    player.name = req.body.name;
    player.position = req.body.position;

    // Try saving the updated article
    player.save(function(err) {
        if (err) {
            // If an error occurs send the error message
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            // Send a JSON representation of the article 
            res.json(player);
        }
    });
};
// Create a new controller method that delete an existing article
exports.delete = function(req, res) {
    // Get the article from the 'request' object
    var player = req.player;

    // Use the model 'remove' method to delete the article
    player.remove(function(err) {
        if (err) {
            // If an error occurs send the error message
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            // Send a JSON representation of the article 
            res.json(player);
        }
    });
};
// Create a new controller middleware that retrieves a single existing article
exports.articleByID = function(req, res, next, id) {
    // Use the model 'findById' method to find a single article 
    Player.findById(id).populate('creator', 'name').exec(function(err, article) {
        if (err) return next(err);
        if (!Player) return next(new Error('Failed to load article ' + id));

        // If an article is found use the 'request' object to pass it to the next middleware
        req.player = Player;

        // Call the next middleware
        next();
    });
};
// Create a new controller middleware that is used to authorize an article operation 
exports.hasAuthorization = function(req, res, next) {
    // If the current user is not the creator of the article send the appropriate error message
    if (req.player.creator.id !== req.user.id) {
        return res.status(403).send({
            message: 'User is not authorized'
        });
    }

    // Call the next middleware
    next();
};




















