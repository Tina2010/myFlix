const express = require('express');
morgan = require('morgan'),
bodyParser = require('body-parser'),
uuid = require('uuid');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = 8081;

//Integrating Mongoose with the REST API
const mongoose = require('mongoose');
const Models = require('./models.js');
const Movie = Models.Movie;
const User = Models.User;
const Genre = Models.Genre;
const Director = Models.Director;
mongoose.connect('mongodb://localhost:27017/myFlixDB', {useNewUrlParser: true, useUnifiedTopology: true});

//adding log for call of a page
app.use(morgan('common'));

//middleware to recognize incoming request as JSON Object
app.use(express.json());

//------------------------------METHODS FOR CRUD--------------------------------------------

// GET Requests
app.get('/', (req, res) => {
  res.sendFile('/index.html', { root: __dirname });
  console.log(res.status);
});   

// GET Return list of all movies
app.get('/movies', (req, res) => {
  Movie.find()
    .then((movies) => {
      res.status(201).json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// GET Return all data about a single movie, by title

app.get('/movies/:Title', (req, res) => {
  Movie.find({Title: req.params.Title})
    .then((movies) => {
      res.status(201).json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

//POST Adding movie
app.post('/movies', (req, res) => {
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
app.post('/genres', (req, res) => {
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
app.get('/genres', (req, res) => {
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

app.get('/genres/:Name', (req, res) => {
  Genre.findOne({Name: req.params.Name})
    .then((genres) => {
      res.status(201).json(genres);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// GET Return all directors

app.get('/directors', (req, res) => {
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

app.get('/directors/:Name', (req, res) => {
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
app.post('/directors', (req, res) => {
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

// GET Return documentation.html
app.get('/documentation.html', (req, res) => {
  res.sendFile('/public/documentation.html', { root: __dirname });
  console.log(res.status);
});

// GET Return all users
app.get('/users', (req, res) => {
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
app.get('/users/:username', (req, res) => {
  User.findOne({username: req.params.username})
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// POST Allow new users to register
app.post('/users', (req, res) => {
  User.findOne({username: req.body.username})
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.username + ' already exists.');
      } else {
        User
          .create({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            birthday: req.body.birthday
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
app.put('/users/:username', (req, res) => {
  User.findOneAndUpdate({username: req.params.username}, 
    {$set:
    {
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      birthday: req.body.birthday
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
app.delete('/users/:username', (req, res) => {
  User.findOneAndRemove({ username: req.params.username })
    .then((user) => {
      if (!user) {
        res.status(400).send(req.params.username + ' was not found');
      } else {
        res.status(200).send(req.params.username + ' was deleted.');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// POST Allow users to add a movie as favorite
app.post('/users/:username/movies/:MovieID', (req, res) => {
  User.findOneAndUpdate({ username: req.params.username }, {
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
app.delete('/users/:username/movies/:MovieID', (req, res) => {
  User.findOneAndUpdate({ username: req.params.username }, {
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
app.listen(port, () =>{
    console.log('Your app is listening on port ' + port + ' .');
    });