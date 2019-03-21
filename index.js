const server = require('./server');
const express = require('express');

const port = process.env.PORT || 8080;

const pathToBuildFolder = path.join(__dirname, 'build');
const pathToIndexHtml = path.join(pathToBuildFolder, 'index.html');

server.use(express.static(pathToBuildFolder));
server.get('/', (req, res) => {
  res.sendFile(pathToIndexHtml);
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
