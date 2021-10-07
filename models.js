const mongoose = require('mongoose');

let movieSchema = mongoose.Schema({
    Title: {type: String, requiered: true},
    Description: {type: String, required: true},
    Genre: {
        Name: String,
        Description: String
    },
    Director: {
        Name: String,
        Bio: String
    },
    Actors: [String],
    ImagePath: String,
    Featured: Boolean
});

let userSchema = mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true},
    birthday: Date,
    FavoriteMovies: [{ 
        type: mongoose.Schema.Types.ObjectId, ref: 'Movie' 
    }]
});

// Attempt to populate favoritemovies of each user
// https://mongoosejs.com/docs/populate.html
/* User.
    findOne().populate({
        path: 'FavoriteMovies',
        populate: {path: FAvoriteMovies}
    }); */

let Movie = mongoose.model('Model', movieSchema);
let User = mongoose.model('User', userSchema);

module.exports.Movie = Movie;
module.exports.User = User;