const bcrypt = require('bcrypt');
const connectToDatabase = require('./db');

async function loginUser(username, password, res) {
  let connection;

  try {
    connection = connectToDatabase();

    // Check if the user exists
    const existingUser = await connection.query('SELECT * FROM users WHERE username = ?', [username]);
    if (existingUser.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the password is correct
    const isPasswordCorrect = await bcrypt.compare(password, existingUser[0].password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    return res.status(200).json({ message: 'User logged in successfully' });
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
  finally {
    if (connection) {
      connection.end();
    }
  }
}

module.exports = loginUser 