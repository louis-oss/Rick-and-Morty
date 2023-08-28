const bcrypt = require('bcrypt');
const connectToDatabase = require('./db');


async function registerUser(username, password, email, res) {
  let connection;

  try {
    connection = connectToDatabase();

    // Check if the user already exists
    const existingUser = await connection.query('SELECT * FROM users WHERE username = ?', [username]);
    if (existingUser === []) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Hash the password using bcrypt
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert the user into the database
    await connection.query('INSERT INTO users (username, password, email) VALUES (?, ?, ?)', [username, hashedPassword, email]);

    return res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error during registration:', error);
    return res.status(500).json({ message: 'Internal server error' });
  } finally {
    if (connection) {
      connection.end();
    }
  }
}

module.exports = registerUser;