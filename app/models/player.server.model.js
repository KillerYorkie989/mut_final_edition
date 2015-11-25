// invoke "strict" JavaScript mode
'use strict';

// Load module dependencies
var mongoose = require("mongoose"),
    Schema = mongoose.Schema;
    
// Define a new 'PlayerSchema'
var PlayerSchema = new Schema({
     name: {
        type: String,
        required: 'Must input a Player name'
    },
    position: {
        type: String,
        required: 'Must input a Position'
    },
    overall: {
        type: Number, max:99, min:0,
        required: 'Must input an Overall Rating'
    },
    speed: {
        type: Number,max:99,min:0,
        required: 'Must input a Speed Rating'
    },
    awareness: {
        type: Number,max:99,min:0,
        required: 'Must input an Awareness Rating'
    },
    strength: {
        type: Number,max:99,min:0,
        required: 'Must input a Strength Rating'
    },
    agility: {
        type: Number,max:99,min:0,
        required: 'Must input an Agility Rating'
    },
    creator: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

// create the 'Player' model out of the 'PlayerSchema'
mongoose.model('Player', PlayerSchema);