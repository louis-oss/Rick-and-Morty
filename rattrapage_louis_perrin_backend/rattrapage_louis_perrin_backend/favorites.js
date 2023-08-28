const connectToDatabase = require('./db');

async function addFavorite(username, id_favorite, res) {
  let connection;
  console.log(username, id_favorite)

  try {
    connection = connectToDatabase();

    await connection.query('INSERT INTO favorites (username, id_favorite) VALUES (?, ?)', [username, id_favorite]);

    return res.status(201).json({ message: 'Favorite added successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  } finally {
    if (connection) {
      connection.end();
    }
  }
}

async function removeFavorite(username, id_favorite, res) {
  let connection;

  try {
    connection = connectToDatabase();

    await connection.query('DELETE FROM favorites WHERE username = ? AND id_favorite = ?', [username, id_favorite]);

    return res.status(201).json({ message: 'Favorite removed successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  } finally {
    if (connection) {
      connection.end();
    }
  }
}

async function getFavorites(username, res) {
  let connection;

  try {
    connection = connectToDatabase();

    const favorites = await connection.query('SELECT * FROM favorites WHERE username = ?', [username]);

    return res.status(200).json(favorites);
  }
  catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
  finally {
    if (connection) {
      connection.end();
    }
  }
}

module.exports = {
  addFavorite,
  removeFavorite,
  getFavorites
}