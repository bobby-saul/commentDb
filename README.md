# Comment DB

This project is for creating an endpoint for accessing a postgres db used for holding data for a commenting system.

TODO:
- [ ] Document how to set up heroku app
- [ ] Make an admin portal for approving/deleting comments

## The database

The table is set up as follows:

id | path | timestamp | comment | user_name | user_email | reply_id | approved

Created with:
```
CREATE TABLE TABLE_NAME(
  id SERIAL PRIMARY KEY,
  path CHAR(2000) NOT NULL,
  timestamp TIMESTAMP NOT NULL DEFAULT NOW(),
  comment TEXT NOT NULL,
  user_name CHAR(256) NOT NULL,
  user_email CHAR(256),
  reply_id INT,
  approved BOOLEAN
);
```
in createDbTable.js.

## Environment

Copy example.env as .env and replace the the values for what is appropriate for your circumstance.

## Running the app

First, add the database table with `node createdDbTable.js`.

Start the app with `npm run start`. 

This creates a GET endpoint which takes a 'path' query parameter, and this creates a POST endpoint which takes 'path', 'comment', 'userName', optional 'userEmail', and optional 'replyId'. 

Clean up can be done with `node dropDbTable.js`. This will remove the table from the database. Only do this if you don't need it anymore!
