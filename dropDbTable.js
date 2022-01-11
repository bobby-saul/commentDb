// ONLY RUN THIS FILE IF YOU MEAN IT!
require('dotenv').config();
const db = require('./db');

// Drop the table
db.query(
  `DROP TABLE ${process.env.TABLE_NAME}`,
  (err, res) => {
    if (err) {
      console.error(err);
      throw new Error('Could not properly drop database table.');
    }
    console.log('Successfully dropped database table.')
  }
);