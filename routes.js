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

// =========== POST ROUTES ========== \\

/*When the client makes a `POST` request to `/api/posts`:

- If the request body is missing the `title` or `contents` property:

  - cancel the request.
  - respond with HTTP status code `400` (Bad Request).
  - return the following JSON response: `{ errorMessage: "Please provide title and contents for the post." }`.

- If the information about the _post_ is valid:

  - save the new _post_ the the database.
  - return HTTP status code `201` (Created).
  - return the newly created _post_.

- If there's an error while saving the _post_:
  - cancel the request.
  - respond with HTTP status code `500` (Server Error).
  - return the following JSON object: `{ error: "There was an error while saving the post to the database" }`.
 */

routes.post('/api/posts', async (req, res) => {
  try {
    const post = await db.insert(req.body);
    if (post.id) {
      const newPost = await db.findById(post.id);
      res.status(201).json(newPost);
    } else {
      res.status(400).json({ errorMessage: 'Please provide title and contents for the post.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'There was an error while saving the post to the database' });
  }
});

module.exports = routes;
