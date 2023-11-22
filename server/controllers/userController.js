// const db = require('../models/models.js');
import db from "../models/models.js";
import bcrypt from "bcryptjs";

const userController = {};

// method for creating a new user
userController.createUser = async (req, res, next) => {
  try {
    // get inputted username and password from req.body
    const { username, password } = req.body;
    // if either is not inputted error out
    if (!username || !password) {
      return next({
        log: `userController.createUser ERROR: username or password not entered`,
        status: 400,
        message: { err: "Username and Password are required!" },
      });
    }
    // generate salt and encrypt with bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // store username and hashed password in DB, return the newly created userId
    const vals = [username, hashedPassword];
    const queryCreate =
      "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id";
    const user = await db.query(queryCreate, vals);
    // grab the id of the newly created user and store on res.locals
    res.locals.userId = user.rows[0].id;
    return next();
  } catch (err) {
    return next({
      log: `usersController.createUser ERROR: ${err}`,
      status: 500,
      message: { err: "Error occured creating user" },
    });
  }
};

userController.verifyUser = async (req, res, next) => {
  try {
    // get username and password from post request body
    const { username, password } = req.body;
    // verify that a username and password were provided. If not return an error
    if (!username || !password) {
      return next({
        log: "Missing username or password in usersController.verifyUser",
        status: 400,
        message: { err: "Username and Password required" },
      });
    }
    // find and save the user in the database with a matching username
    const query = "SELECT * FROM users WHERE users.username=$1";
    const params = [username];
    const result = await db.query(query, params);
    const user = result.rows[0];
    console.log("user from db select", user);
    // if can't find user in the database return error message
    if (!user) {
      return next({
        log: "No matches to username found in usersController.verifyUser",
        status: 401,
        message: { err: "Invalid username or password" },
      });
    } else {
      try {
        // check if provided password matches stored hashed password
        const result = await bcrypt.compare(password, user.password);
        if (!result) {
          // password did not match
          return next({
            log: "Invalid password in usersController.verifyUser",
            status: 401,
            message: { err: "Invalid username or password" },
          });
        } else {
          // store userID and username
          res.locals.userID = user.id;
          res.locals.username = user.username;
          return next();
        }
      } catch (err) {
        // pass error through to global error handler for errors in comparing passwords
        return next({
          log: `usersController.verifyUser bcrypt compare ERROR: ${err}`,
          status: 500,
          message: { err: "Error verifying user" },
        });
      }
    }
  } catch (err) {
    // pass error through to global error handler
    return next({
      log: `usersController.verifyUser ERROR: ${err}`,
      status: 500,
      message: { err: "Error verifying user" },
    });
  }
};

userController.getMovies = async (req, res, next) => {
  try {
    const userID = req.query;
    const params = [userID];

    const queryToWatch = `
        SELECT m.title, m.overview, m.release_date, m.poster
        FROM usermovies AS um 
        LEFT INNER JOIN movies AS m
        ON um.movieID = m.id
        WHERE um.username = $1 AND um.watched = false
        `;
    const resultToWatch = await db.query(queryToWatch, params);
    res.locals.toWatchList = resultToWatch.rows;

    const queryWatched = `
        SELECT m.title, m.overview, m.release_date, m.poster
        FROM usermovies AS um 
        LEFT INNER JOIN movies AS m
        ON um.movieID = m.id
        WHERE um.username = $1 AND um.watched = true
        `;
    const resultWatched = await db.query(queryWatched, params);
    res.locals.watchedList = resultWatched.rows;
    return next();
  } catch (err) {
    // pass error through to global error handler
    return next({
      log: `usersController.getMovies ERROR: ${err}`,
      status: 500,
      message: { err: "Error getting movies" },
    });
  }
};

userController.addMovie = async (req, res, next) => {
  try {
    const { userID } = req.body;
    const movieID = res.locals.movieID;
    const params = [userID, movieID.id];
    console.log("params", params);
    const query = `
        INSERT INTO usermovies (userid, movieid)
        VALUES ($1, $2)
        RETURNING userid, movieid
        `;
    const result = await db.query(query, params);
    res.locals.movie = result.rows[0];
    return next();
  } catch (err) {
    // pass error through to global error handler
    return next({
      log: `usersController.addMovie ERROR: ${err}`,
      status: 500,
      message: { err: "Error adding movie" },
    });
  }
};

userController.watchMovie = async (req, res, next) => {
  try {
    const { userID, movieID, watched } = req.body;
    const params = [userID, movieID, watched];

    const query = `
        UPDATE usermovies 
        SET watched = $3
        WHERE userid = $1 AND movieid = $2
        RETURNING userid, movieid, watched
        `;
    const result = await db.query(query, params);
    res.locals.movie = result.rows[0];
    return next();
  } catch (err) {
    // pass error through to global error handler
    return next({
      log: `usersController.watchMovie ERROR: ${err}`,
      status: 500,
      message: { err: "Error watching movie" },
    });
  }
};

userController.rateMovie = async (req, res, next) => {
  try {
    const { userID, movieID, rating } = req.body;
    const params = [userID, movieID, rating];

    const query = `
        UPDATE usermovies 
        SET rating = $3
        WHERE userid = $1 AND movieid = $2
        RETURNING userid, movieid, rating
        `;
    const result = await db.query(query, params);
    res.locals.movie = result.rows[0];
    return next();
  } catch (err) {
    // pass error through to global error handler
    return next({
      log: `usersController.rateMovie ERROR: ${err}`,
      status: 500,
      message: { err: "Error rating movie" },
    });
  }
};

export default userController;
