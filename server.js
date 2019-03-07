//////////////////////////////////////////////////////////////////////
// Server for filmtv

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const request = require('request');

//Get controllers
const getMovies = require('./controllers/getMovies');

//set up variables
const authKey = 'e88f04a0c3ba730c268e1240320d9aa8';
const movie = 'movie';
const tv = 'tv';

const app = express();
app.use(bodyParser.json()); 
app.use(cors());

//default page to see if server is working
app.get('/', (req, res) => res.send('it is working'))

app.get('/nowPlayingMovies', (req, res) => { getMovies.handelGetMovies(req, res,  request, authKey , movie, 'now_playing') });
app.get('/popularMovies', (req, res) => { getMovies.handelGetMovies(req, res, request, authKey , movie, 'popular') });
app.get('/topRatedMovies', (req, res) => { getMovies.handelGetMovies(req, res, request, authKey , movie, 'top_rated') });
app.get('/upcomingMovies', (req, res) => { getMovies.handelGetMovies(req, res, request, authKey , movie, 'upcoming') });

app.get('/airingTodayTv', (req, res) => { getMovies.handelGetMovies(req, res, request, authKey, tv, 'airing_today') });
app.get('/onTheAirTv', (req, res) => { getMovies.handelGetMovies(req, res, request, authKey, tv, 'on_the_air') });
app.get('/popularTv', (req, res) => { getMovies.handelGetMovies(req, res, request, authKey, tv, 'popular') });
app.get('/topRatedTv', (req, res) => { getMovies.handelGetMovies(req, res, request, authKey, tv, 'top_rated') });

app.listen(process.env.PORT || 3001, () => {
    console.log(`App is running on port ${process.env.PORT}`);
})