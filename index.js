const express = require('express'),
morgan = require('morgan');
const app = express();

//adding log for call of a page
app.use(morgan('common'));

// list for index.html
let top10movies = [
  {
    title: 'movie1',
    producer: 'producer'
  },
  {
    title: 'movie2',
    producer: 'producer'
  },
  {
    title: 'movie3',
    producer: 'producer'
  },
  {
    title: 'movie4',
    producer: 'producer'
  },
  {
    title: 'movie5',
    producer: 'producer'
  },
  {
    title: 'movie6',
    producer: 'producer'
  },
  {
    title: 'movie7',
    producer: 'producer'
  },
  {
    title: 'movie8',
    producer: 'producer'
  },
  {
    title: 'movie9',
    producer: 'producer'
  },
  {
    title: 'movie10',
    producer: 'producer'
  }
]

// GET requests
app.get('/', (req, res) => {
    res.send('Start Page');
    });

app.get('/index.html', (req, res) => {
  res.json(top10movies);
});

app.get('/documentation.html', (req, res) => {
  res.sendFile('/public/documentation.html', { root: __dirname });
});

// USE of static page
app.use(express.static('public'));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

  // listen for requests
app.listen(8080, () =>{
    console.log('Your app is listening on port 8080.');
    });