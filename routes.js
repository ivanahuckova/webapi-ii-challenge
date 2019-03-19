const express = require('express');
const db = require('./data/db');

const routes = express.Router();

routes.use(express.json());

// =========== GET ROUTES ========== \\

routes.get('/api/posts', async (req, res) => {
  try {
    const posts = await db.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: 'The posts information could not be retrieved.' });
  }
});

routes.get('/api/posts/:id', async (req, res) => {
  try {
    const post = await db.findById(req.params.id);
    if (post.length > 0) {
      res.status(201).json(post);
    } else {
      res.status(404).json({ message: 'The post with the specified ID does not exist.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'The post information could not be retrieved.' });
  }
});

module.exports = routes;