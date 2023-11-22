// const db = require('../models/models.js');
import db from '../models/models.js';

const movieController = {};

//method for searching for movies
movieController.searchMovies = async (req, res, next) => {
  try {
    // obtain the searched for movie from the body
    const title = req.body.title;
    // replace spaces with %20
    const urlTitle = title.replace(/ /g, '%20');
    // construct url for api request
    const url = `https://api.themoviedb.org/3/search/movie?query=${urlTitle}&api_key=e4950f0d827ebe386c19542ac9a855ed`;
    // save fetch request to res.locals
    const response = await fetch(url);
    res.locals.allMovies = await response.json();
    return next();
  } catch (err) {
    // pass error to global error handler
    return next({
      log: `movieController.searchMovies ERROR: ${err}`,
      status: 500,
      message: { err: 'Error searching for movies' },
    });
  }
};

// method for removing unneeded info
movieController.simplifyMovies = async (req, res, next) => {
  try {
    // use map to create a new array containing only needed info for movies and add to res.locals
    res.locals.movies = res.locals.allMovies.results.map((movie) => {
      return {
        title: movie.title,
        release_date: movie.release_date.slice(0, 4),
        overview: movie.overview,
        poster: movie.poster_path,
      };
    });
    return next();
  } catch (err) {
    // pass error to global error handler
    return next({
      log: `movieController.simplifyMovies ERROR: ${err}`,
      status: 500,
      message: { err: 'Error simplifying movies' },
    });
  }
};

movieController.addToDB = async (req, res, next) => {
  try {
    const { title, release_date, overview, poster } = req.body;

    const query = `
       INSERT INTO movies (title, release_date, overview, poster)
        VALUES ($1, $2, $3, $4)
        RETURNING id
       `;
    const params = [title, release_date, overview, poster];

    const result = await db.query(query, params);
    res.locals.movieID = result.rows[0];

    return next();
  } catch (err) {
    // pass error to global error handler
    return next({
      log: `movieController.addToDB ERROR: ${err}`,
      status: 500,
      message: { err: 'Error adding movies to database' },
    });
  }
};

export default movieController;
