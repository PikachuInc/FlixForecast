import { Pool } from 'pg';

const PG_URI = 'postgres://cokiibbh:49yxEogtCEW0vVI5aq1Oj5xAKoNkBHjM@berry.db.elephantsql.com/cokiibbh';

// create a new pool here using the connection string above
const pool = new Pool({
  connectionString: PG_URI
});

module.exports = {
    query: (text, params, callback) => {
      console.log('executed query', text);
      return pool.query(text, params, callback);
    }
};