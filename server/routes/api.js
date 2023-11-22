import express from 'express';

import userController from '../controllers/userController.js';
import movieController from '../controllers/movieController.js';

const router = express.Router();

// route for signing up
// POST to '/signup'
router.post('/signup', userController.createUser, (req, res) => {
  return res
    .status(200)
    .json({ username: res.locals.username, userID: res.locals.userID });
});

// route for logging in
// POST to '/login'
router.post('/login', userController.verifyUser, (req, res) => {
  return res
    .status(200)
    .json({ username: res.locals.username, userID: res.locals.userID });
});

// route for searching movies
// GET to '/movies?title'
router.post(
  '/movies',
  movieController.searchMovies,
  movieController.simplifyMovies,
  (req, res) => {
    return res.status(200).json(res.locals.movies);
  }
);

// route for populating your movie lists
// GET to '/myMovies?userID'
router.get('/myMovies?userID', userController.getMovies, (req, res) => {
  return res
    .status(200)
    .json({
      toWatchList: res.locals.toWatchList,
      watchedList: res.locals.watchedList,
    });
});

// route for adding to myMovies
// POST to '/myMovies'
router.post('/myMovies', movieController.addToDB, userController.addMovie, (req, res) => {
  return res.status(200).json(res.locals.movie);
});

// route for toggling 'watched' on myMovies
// POST to '/myMovies/watch'
router.post('/myMovies/watch', userController.watchMovie, (req, res) => {
  return res.status(200).json(res.locals.movie);
});

// route for rating myMovies
// POST to '/myMovies/rate'
router.post('/myMovies/rate', userController.rateMovie, (req, res) => {
  return res.status(200).json(res.locals.movie);
});

export { router as apiRouter };
// module.exports = router;
