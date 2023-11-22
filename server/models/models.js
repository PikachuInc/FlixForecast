// const { Pool } = require('pg');
// import {Pool} from 'pg';
import pkg from 'pg';
const {Pool} = pkg;

const PG_URI = 'postgres://cokiibbh:49yxEogtCEW0vVI5aq1Oj5xAKoNkBHjM@berry.db.elephantsql.com/cokiibbh';

// create a new pool here using the connection string above
const pool = new Pool({
  connectionString: PG_URI
});

export default {
    query: (text, params, callback) => {
      console.log('executed query', text);
      return pool.query(text, params, callback);
    }
};