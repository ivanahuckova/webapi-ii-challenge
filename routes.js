const express = require('express');
const db = require('./data/db');

const routes = express.Router();

routes.use(express.json());
