const express = require('express');

const server = express();

const logger = require('./middleware/middleware.js');

const postRouter = require('./posts/postRouter.js');

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

server.use(logger);

server.use('/api/posts', postRouter);

module.exports = server;
