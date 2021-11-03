const dotenv = require("dotenv");
dotenv.config();
//Integrating Mongoose with the REST API
const mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  express = require('express'),
  morgan = require('morgan'),
  Models = require('./models.js'),
  cors = require('cors'),
  { check, validationResult } = require('express-validator');

const passport = require('passport');
require('./passport');

const Movie = Models.Movie;
const User = Models.User;
const Genre = Models.Genre;
const Director = Models.Director;

app = express();

app.use(bodyParser.json());

app.use(cors());

let auth =require("./auth.js")(app);

/* mongoose.connect('mongodb://localhost:27017/myFlixDB', {useNewUrlParser: true, useUnifiedTopology: true}); */
mongoose.connect(process.env.CONNECTION_URI, {useNewUrlParser: true, useUnifiedTopology: true});


uuid = require('uuid');


//adding log for call of a page
app.use(morgan('common'));

//middleware to recognize incoming request as JSON Object
app.use(express.json());

app.use(express.urlencoded({ extended: true }));


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send(err);
}); 


//------------------------------METHODS FOR CRUD--------------------------------------------

// GET Return list of all movies
app.get('/movies', passport.authenticate('jwt', { session: false }), (req, res) => {
  Movie.find()
  .populate('Genre','Director')
    .then((movies) => {
      res.status(201).json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// GET Return all data about a single movie, by title

app.get('/movies/:Title', passport.authenticate('jwt', { session: false }), (req, res) => {
  Movie.find({Title: req.params.Title})
  .populate('Genre','Director')
    .then((movies) => {
      res.status(201).json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

//POST Adding movie
app.post('/movies', passport.authenticate('jwt', { session: false }),(req, res) => {
  Movie.findOne({Title: req.body.Title})
    .then((movie) => {
      if (movie) {
        return res.status(400).send(req.body.Title + ' already exists.');
      } else {
        Movie
          .create({
            Title: req.body.Title,
            Description: req.body.Description,
            Genre: req.body.Genre,
            Director: req.body.Director,
            Actors: req.body.Actors,
            ImagePath: req.body.ImagePath,
            Featured: req.body.Featured
          })
          .then((movie) =>{res.status(201).json(movie)})
        .catch((error) => {
          console.error(error);
          res.status(500).send('Error: ' + error);
        })
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});

// POST Adding genre
app.post('/genres', passport.authenticate('jwt', { session: false }),(req, res) => {
  Genre.findOne({Name: req.body.Name})
    .then((genre) => {
      if (genre) {
        return res.status(400).send(req.body.Name + ' already exists.');
      } else {
        Genre
          .create({
            Name: req.body.Name,
            Description: req.body.Description
          })
          .then((genre) =>{res.status(201).json(genre)})
        .catch((error) => {
          console.error(error);
          res.status(500).send('Error: ' + error);
        })
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});

//GET Return list of genres
app.get('/genres', passport.authenticate('jwt', { session: false }),(req, res) => {
  Genre.find()
    .then((genres) => {
      res.status(201).json(genres);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// GET Return single genre by name

app.get('/genres/:Name', passport.authenticate('jwt', { session: false }),(req, res) => {
  Genre.findOne({Name: req.params.Name})
    .then((genres) => {
      res.status(201).json(genres);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// GET genre of single movie

app.get('/:Title/genre', (req, res) => {
  Movie.find({Title: req.params.Title})
  .populate('Genre')
    .then((genre) => {
      res.status(201).json(genre);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// GET Return all directors

app.get('/directors', passport.authenticate('jwt', { session: false }),(req, res) => {
  Director.find()
    .then((directors) => {
      res.status(201).json(directors);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// GET Return single director by name

app.get('/directors/:Name', passport.authenticate('jwt', { session: false }),(req, res) => {
  Director.find({Name: req.params.Name})
    .then((directors) => {
      res.status(201).json(directors);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// POST Add director
app.post('/directors', passport.authenticate('jwt', { session: false }),(req, res) => {
  Director.findOne({Name: req.body.Name})
    .then((director) => {
      if (director) {
        return res.status(400).send(req.body.Name + ' already exists.');
      } else {
        Director
          .create({
            Name: req.body.Name,
            Bio: req.body.Bio
          })
          .then((director) =>{res.status(201).json(director)})
        .catch((error) => {
          console.error(error);
          res.status(500).send('Error: ' + error);
        })
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});

// GET director of single movie

app.get('/:Title/director', (req, res) => {
  Movie.find({Title: req.params.Title})
  .populate('Director')
    .then((movie) => {
      res.status(201).json(movie);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// GET Return documentation.html
app.get('/documentation.html', (req, res) => {
  res.sendFile('/public/documentation.html', { root: __dirname });
  console.log(res.status);
});

// GET Return all users
app.get('/users', passport.authenticate('jwt', { session: false }),(req, res) => {
  User.find()
    .then((users) => {
      res.status(201).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

//GET Return single user by username
app.get('/users/:Username', passport.authenticate('jwt', { session: false }),(req, res) => {
  User.findOne({Username: req.params.Username})
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// POST Allow new users to register
app.post('/users',[
  check('Username', 'Username is required').isLength({min: 5}),
  check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
  check('Password', 'Password is required').not().isEmpty(),
  check('Email', 'Email does not appear to be valid').isEmail()
], (req, res) => {

// check the validation object for errors
  let errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  let hashedPassword = User.hashPassword(req.body.Password);
  User.findOne({Username: req.body.Username})
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.Username + ' already exists.');
      } else {
        User
          .create({
            Username: req.body.Username,
            Password: hashedPassword,
            Email: req.body.Email,
            Birthday: req.body.Birthday
          })
          .then((user) =>{res.status(201).json(user)})
        .catch((error) => {
          console.error(error);
          res.status(500).send('Error: ' + error);
        })
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});


// PUT Allow users to update their user info
app.put('/users/:Username', passport.authenticate('jwt', { session: false }),(req, res) => {
  let hashedPassword = User.hashPassword(req.body.Password);
  User.findOneAndUpdate({username: req.params.Username}, 
    {$set:
    {
      Username: req.body.Username,
      Password: hashedPassword,
      Email: req.body.Email,
      Birthday: req.body.Birthday
    }
  },
  {new: true}, //new document returns after successfull change
  (err, updatedUser) => {
    if(err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser);
    }
  });
});

// DELETE Allow existing users to deregister
app.delete('/users/:Username', passport.authenticate('jwt', { session: false }),(req, res) => {
  User.findOneAndRemove({ Username: req.params.Username })
    .then((user) => {
      if (!user) {
        res.status(400).send(req.params.Username + ' was not found');
      } else {
        res.status(200).send(req.params.Username + ' was deleted.');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// POST Allow users to add a movie as favorite
app.post('/users/:Username/movies/:MovieID', passport.authenticate('jwt', { session: false }),(req, res) => {
  User.findOneAndUpdate({ Username: req.params.Username }, {
    $push: { FavoriteMovies: req.params.MovieID }
  },
  { new: true }, // This line makes sure that the updated document is returned
 (err, updatedUser) => {
   if (err) {
     console.error(err);
     res.status(500).send('Error: ' + err);
   } else {
     res.json(updatedUser);
   }
 });
});

// DELETE Allow users to remove a movie from their favorites
app.delete('/users/:Username/movies/:MovieID', passport.authenticate('jwt', { session: false }),(req, res) => {
  User.findOneAndUpdate({ username: req.params.Username }, {
    $pull: { FavoriteMovies: req.params.MovieID }
  },
  { new: true }, // This line makes sure that the updated document is returned
 (err, updatedUser) => {
   if (err) {
     console.error(err);
     res.status(500).send('Error: ' + err);
   } else {
     res.json(updatedUser);
   }
 });
});

//---------------------END OF CRUD METHODS---------------------------------

// USE of static page
app.use('/static', express.static(__dirname + '/public'));

// error handling
app.use(function(err, res) {
  console.error(err.stack);
  res.status(400).send('This page doesnt exist');
});

  // listen for requests
const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0',() => {
 console.log('Listening on Port ' + port);
});