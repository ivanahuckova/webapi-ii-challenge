const express = require('express');
const postRoutes = require('./routes/postRoutes');
const cors = require('cors');

const server = express();

server.use(express.json());
server.use(cors());

server.use('/', postRoutes);

module.exports = server;
