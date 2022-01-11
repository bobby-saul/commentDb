require('dotenv').config();
const db = require('./db');

// Create table
db.query(
  `CREATE TABLE ${process.env.TABLE_NAME} ( id SERIAL PRIMARY KEY, path CHAR(2000) NOT NULL, timestamp TIMESTAMP NOT NULL DEFAULT NOW(), comment TEXT NOT NULL, user_name CHAR(256) NOT NULL, user_email CHAR(256), reply_id INT, approved BOOLEAN);`,
  (err, res) => {
    if (err) {
      console.error(err);
      throw new Error('Could not properly create database table.');
    }
    console.log('Successfully created database table.')
  }
);
