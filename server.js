const express = require('express');
const postRoutes = require('./routes');
const cors = require('cors');

const server = express();

server.use(express.json());
server.use(cors());

server.use('/api/posts', postRoutes);

module.exports = server;
