require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./db');

const server = express();
const port = process.env.PORT || 80;

server.use(cors());
server.use(express.json());

// Add a comment
server.post('/', (request, response) => {
  if (request.get('API_KEY') === process.env.API_KEY) {
    const path = request.body.path;
    const comment = request.body.comment;
    const userName = request.body.userName;
    const userEmail = request.body.userEmail?.length > 0 ? request.body.userEmail : null;
    const replyId = request.body.replyId ? Number(request.body.replyId) : null;

    db.query(`INSERT INTO ${process.env.TABLE_NAME}(path, comment, user_name, user_email, reply_id) VALUES($1, $2, $3, $4, $5) RETURNING *;`, [path, comment, userName, userEmail, replyId], (err, res) => {
      if (err) {
        console.error(err);
        throw new Error('Could not properly add comment to database.');
      }
      response.json({
        status: 200,
        message: 'Successfully added comment.',
        response: res,
      })
    });
  } else {
    response.json({
      status: 403,
      message: 'Invalid API_KEY provided.',
    });
  }
});

// Get comment for ?path query parameter
server.get('/', [], (request, response) => {
  if (request.get('API_KEY') === process.env.API_KEY) {
    const path = request.query?.path;
    if (path) {
      db.query(`SELECT * FROM ${process.env.TABLE_NAME} where path = '${path}' ORDER BY timestamp DESC`, (err, res) => {
        if (err) {
          console.error(err);
          throw new Error('Could not properly get comments.');
        }
        response.json(res);
      });
    } else {
      response.json({
        status: 400,
        message: 'Invalid path query parameter provided.',
      });
    }
  } else {
    response.json({
      status: 403,
      message: 'Invalid API_KEY provided.',
    });
  }
});

server.listen(port, function () {
  console.log(`Express: Listening to port ${port}`);
});
