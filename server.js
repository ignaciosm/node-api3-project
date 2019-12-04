const express = require('express');
const server = express();
server.use(express.json());

// ROUTERS
const PostsRouter = require('./posts/postRouter');
const UsersRouter = require('./users/userRouter');

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

// ROUTES
server.use('/posts', PostsRouter);
server.use('/users', UsersRouter);

//custom middleware

// function logger(req, res, next) {}

module.exports = server;
