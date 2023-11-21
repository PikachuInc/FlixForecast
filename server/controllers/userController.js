// const db = require('../models/models.js');
import db from '../models/models.js';
import bcrypt from 'bcryptjs';

const userController = {};

// method for creating a new user
userController.createUser = async (req, res, next) => {
  try {
    // get inputted username and password from req.body
    const { username, password } = req.body;
    // if either is not inputted error out
    if (!username || !password) {
      return next({
        log: `userssController.createUser ERROR: username or password not entered`,
        status: 400,
        message: { err: 'Username and Password are required!' },
      });
    }
    // generate salt and encrypt with bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // store username and hashed password in DB, return the newly created userId
    const vals = [username, hashedPassword];
    const queryCreate =
      'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id';
    const user = await db.query(queryCreate, vals);
    // grab the id of the newly created user and store on res.locals
    res.locals.userId = user.rows[0].id;
    return next();
  } catch (err) {
    return next({
      log: `usersController.createUser ERROR: ${err}`,
      status: 500,
      message: { err: 'Error occured creating user' },
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
        log: 'Missing username or password in usersController.verifyUser',
        status: 400,
        message: { err: 'Username and Password required' },
      });
    }
    // find and save the user in the database with a matching username
    const query = 'SELECT * FROM users WHERE users.username=$1';
    const params = [username];
    const result = await db.query(query, params);
    const user = result.rows[0];
    console.log('user from db select', user);
    // if can't find user in the database return error message
    if (!user) {
      return next({
        log: 'No matches to username found in usersController.verifyUser',
        status: 401,
        message: { err: 'Invalid username or password' },
      });
    } else {
      try {
        // check if provided password matches stored hashed password
        const result = await bcrypt.compare(password, user.password);
        if (!result) {
          // password did not match
          return next({
            log: 'Invalid password in usersController.verifyUser',
            status: 401,
            message: { err: 'Invalid username or password' },
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
          message: { err: 'Error verifying user' },
        });
      }
    }
  } catch (err) {
    // pass error through to global error handler
    return next({
      log: `usersController.verifyUser ERROR: ${err}`,
      status: 500,
      message: { err: 'Error verifying user' },
    });
  }
};

export default userController;
