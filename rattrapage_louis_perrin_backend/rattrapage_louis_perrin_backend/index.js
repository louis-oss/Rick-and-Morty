const express = require('express');
const bodyParser = require('body-parser');
const loginUser = require('./login');
const registerUser = require('./register');
const cors = require('cors');
const { addFavorite, removeFavorite, getFavorites } = require('./favorites');
require('dotenv').config()

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const port = 5000;

// Register route
app.post('/register', async (req, res) => {
  const { username, password, email } = req.body;
  await registerUser(username, password, email, res);
});

// Login route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  await loginUser(username, password, res);
});

app.post('/add_favorite', async (req, res) => {
  const { username, id_favorite } = req.body;
  await addFavorite(username, id_favorite, res);
})

app.post('/remove_favorite', async (req, res) => {
  const { username, id_favorite } = req.body;
  await removeFavorite(username, id_favorite, res);
})

app.get('/favorites/:username', async (req, res) => {
  const { username } = req.params;
  await getFavorites(username, res);
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});