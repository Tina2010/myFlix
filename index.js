const express = require('express'),
morgan = require('morgan');
const app = express();

//adding log for call of a page
app.use(morgan('common'));

//middleware to recognize incoming request as JSON Object
app.use(express.json());

// list for index.html
let top10movies = [
  {
    title: 'movie1',
    director: {
      name:'director1',
      bio: 'director bio',
      birth_year: '01.01.1999',
      death_year: '02.01.1999'
    },
    description: 'movie description',
    genre: 'movie genre',
    image: 'movie image',
    favorite: 'no'
  },
  {
    title: 'movie2',
    director: {
      name:'director2',
      bio: 'director bio',
      birth_year: '01.01.1998',
      death_year: '02.01.1998'
    },
    description: 'movie description',
    genre: 'movie genre',
    image: 'movie image',
    favorite: 'no'
  },
  {
    title: 'movie3',
    director: {
      name:'director3',
      bio: 'director bio',
      birth_year: '01.01.1997',
      death_year: '02.01.1997'
    },
    description: 'movie description',
    genre: 'movie genre',
    image: 'movie image',
    favorite: 'no'
  },
  {
    title: 'movie4',
    director: {
      name:'director4',
      bio: 'director bio',
      birth_year: '01.01.1996',
      death_year: '02.01.1996'
    },
    description: 'movie description',
    genre: 'movie genre',
    image: 'movie image',
    favorite: 'no'
  },
  {
    title: 'movie5',
    director: {
      name:'director5',
      bio: 'director bio',
      birth_year: '01.01.1995',
      death_year: '02.01.1995'
    },
    description: 'movie description',
    genre: 'movie genre',
    image: 'movie image',
    favorite: 'no'
  },
  {
    title: 'movie6',
    director: {
      name:'director6',
      bio: 'director bio',
      birth_year: '01.01.1994',
      death_year: '02.01.1994'
    },
    description: 'movie description',
    genre: 'movie genre',
    image: 'movie image',
    favorite: 'no'
  },
  {
    title: 'movie7',
    director: {
      name:'director7',
      bio: 'director bio',
      birth_year: '01.01.1993',
      death_year: '02.01.1993'
    },
    description: 'movie description',
    genre: 'movie genre',
    image: 'movie image',
    favorite: 'no'
  },
  {
    title: 'movie8',
    director: {
      name:'director8',
      bio: 'director bio',
      birth_year: '01.01.1992',
      death_year: '02.01.1992'
    },
    description: 'movie description',
    genre: 'movie genre',
    image: 'movie image',
    favorite: 'no'
  },
  {
    title: 'movie9',
    director: {
      name:'director9',
      bio: 'director bio',
      birth_year: '01.01.1991',
      death_year: '02.01.1991'
    },
    description: 'movie description',
    genre: 'movie genre',
    image: 'movie image',
    favorite: 'no'
  },
  {
    title: 'movie10',
    director: {
      name:'director10',
      bio: 'director bio',
      birth_year: '01.01.1990',
      death_year: '02.01.1990'
    },
    description: 'movie description',
    genre: 'movie genre',
    image: 'movie image',
    favorite: 'no'
  }
]

let users = [
  {
    username: 'user1',
    id: '1'
  }
]

// GET requests
app.get('/', (req, res) => {
    res.send('Start Page');
    });

// Gets all movies
app.get('/index.html', (req, res) => {
  res.json(top10movies);
});

// Gets the data about a single movie, by title

app.get('/movies/:title', (req, res) => {
  res.json(top10movies.find((title) =>
    { return top10movies.title === req.params.title }));
});

// Gets the genre about a single movie, by title

app.get('/movies/:title', (req, res) => {
  res.json(top10movies.find((title) =>
    { return top10movies.title === req.params.genre }));
});

// Gets a single director

app.get('/movies/:director', (req, res) => {
  res.json(top10movies.find((director) =>
    { return top10movies.director === req.params.director }));
});

// Forwards documentation to documentation.html
app.get('/documentation.html', (req, res) => {
  res.sendFile('/public/documentation.html', { root: __dirname });
});

// Gets all users
app.get('/users', (req, res) => {
  res.json(users);
});

// Adds new user to the user list
app.post('/users', (req, res) => {
  let newUser = req.body;

  if (!newUser.username) {
    const message = 'Missing name in request body';
    res.status(400).send(message);
  } else {
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(201).send(newUser);
  }
});

// Update the username of a user
app.put('/users/:username', (req, res) => {
  let user = users.find((users) => { return users.username === req.params.username });

  if (user) {
    user.username[req.params.username] = parseInt(req.params.username);
    res.status(201).send('message');
  } else {
    res.status(404).send('User with the name ' + req.params.username + ' was not found.');
  }
});

// Deletes a user from our list by ID
app.delete('/users/:id', (req, res) => {
  let user = users.find((user) => { return user.id === req.params.id });

  if (user) {
    users = users.filter((obj) => { return obj.id !== req.params.id });
    res.status(201).send('User ' + req.params.id + ' was deleted.');
  }
});

// Add movie as favorite
app.put('/index.html/:title/:favorite', (req, res) => {
  let movie = top10movies.find((title) => { return top10movies.title === req.params.title });

  if (movie) {
    top10movies.title[req.params.favorite] = parseInt(req.params.favorite);
    res.status(201).send('Movie was added as favorite.');
  } else {
    res.status(404).send('Movie with the name ' + req.params.username + ' was not found.');
  }
});

// Remove movie as favorite
app.put('/index.html/:title/:favorite', (req, res) => {
  let movie = top10movies.find((title) => { return top10movies.title === req.params.title });

  if (movie) {
    top10movies.title[req.params.favorite] = parseInt(req.params.favorite);
    res.status(201).send('Movie was removed as favorite.');
  } else {
    res.status(404).send('Movie with the name ' + req.params.username + ' was not found.');
  }
});

// USE of static page
app.use('/static', express.static(__dirname + '/public'));

// error handling
app.use(function(err, res) {
  console.error(err.stack);
  res.status(400).send('This page doesnt exist');
});

  // listen for requests
app.listen(8080, () =>{
    console.log('Your app is listening on port 8080.');
    });