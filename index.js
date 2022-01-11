require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./db');

const server = express();
const port = process.env.PORT || 8000;

server.use(cors());
server.use(express.json());

// Add a comment
server.post('/', (request, response) => {
  if (request.get('API_KEY') === process.env.API_KEY) {
    const path = request.body.path?.trim();
    const comment = request.body.comment?.trim();
    const userName = request.body.userName?.trim();
    const userEmail = request.body.userEmail ? request.body.userEmail?.trim() : null;
    const replyId = request.body.replyId ? Number(request.body.replyId) : null;

    db.query(`INSERT INTO ${process.env.TABLE_NAME} (path, comment, user_name, user_email, reply_id) VALUES ('${path}', '${comment}', '${userName}', '${userEmail}', ${replyId});`, (err, res) => {
      if (err) {
        console.error(err);
        throw new Error('Could not properly add comment to database.');
      }
      response.json({
        status: 200,
        message: 'Successfully added comment.',
        data: request.body
      })
    });
  } else {
    response.json({
      status: 400,
      message: 'Invalid API_KEY provided.',
    });
  }
});

// Get comment for ?path query parameter
server.get('/', (request, response) => {
  if (request.get('API_KEY') === process.env.API_KEY) {
    const path = request.query?.path;
    if (path) {
      db.query(`SELECT * FROM ${process.env.TABLE_NAME} where path = '${path}'`, (err, res) => {
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
      status: 400,
      message: 'Invalid API_KEY provided.',
    });
  }
});

server.listen(port);
