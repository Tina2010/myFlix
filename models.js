const mongoose = require('mongoose');

let genreSchema = mongoose.Schema({
    Name:{type: String, requiered: true},
    Description: {type: String}
});

let directorSchema = mongoose.Schema({
    Name:{type: String, required: true},
    Bio: {type: String}
});

let movieSchema = mongoose.Schema({
    Title: {type: String, requiered: true},
    Description: {type: String, required: true},
    Genre: [{ 
        type: mongoose.Schema.Types.ObjectId, ref: 'Genre' 
    }],
    Director: [{ 
        type: mongoose.Schema.Types.ObjectId, ref: 'Director' 
    }],
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

let Movie = mongoose.model('Movie', movieSchema);
let User = mongoose.model('User', userSchema);
let Genre = mongoose.model('Genre', genreSchema);
let Director = mongoose.model('Director', directorSchema);

module.exports.Movie = Movie;
module.exports.User = User;
module.exports.Genre = Genre;
module.exports.Director = Director;