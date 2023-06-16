import sql from 'mssql';
import config from '../models/config.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const loginRequired = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    return res.status(401).json({ message: 'Unauthorized user!' });
  }
};

export const register = async (req, res) => {
  const { username, password, email } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  try {
    let pool = await sql.connect(config.sql);
    const result = await pool
      .request()
      .input('username', sql.VarChar, username)
      .input('email', sql.VarChar, email)
      .query(
        'SELECT * FROM users WHERE username = @username OR email = @email'
      );
    const user = result.recordset[0];
    if (user) {
      res.status(409).json({ error: 'User already exists' });
    } else {
      await pool
        .request()
        .input('username', sql.VarChar, username)
        .input('hashedpassword', sql.VarChar, hashedPassword)
        .input('email', sql.VarChar, email)
        .query(
          'INSERT INTO users (username, hashedpassword, email) VALUES (@username, @hashedpassword, @email)'
        );
      res.status(200).send({ message: 'User created successfully' });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: 'An error occurred while creating the user' });
  } finally {
    sql.close();
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  let pool = await sql.connect(config.sql);
  try {
    const result = await pool
      .request()
      .input('username', sql.VarChar, username)
      .query('SELECT * FROM users WHERE username = @username');
    const user = result.recordset[0];
    if (!user) {
      res
        .status(401)
        .json({ error: 'Authentication failed. Wrong credentials.' });
    } else {
      if (!bcrypt.compareSync(password, user.hashedpassword)) {
        res
          .status(401)
          .json({ error: 'Authentication failed. Wrong credentials.' });
      } else {
        const token = `JWT ${jwt.sign(
          { username: user.username, email: user.email },
          config.jwt_secret
        )}`;
        res.status(200).json({
          email: user.email,
          username: user.username,
          id: user.id,
          token: token,
        });
      }
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while logging in' });
  } finally {
    sql.close();
  }
};

export const getUser = async (req, res) => {
  const { userId } = req.params;
  try {
    let pool = await sql.connect(config.sql);
    const result = await pool
      .request()
      .input('userId', sql.Int, userId)
      .query('SELECT * FROM users WHERE user_id = @userId');
    const user = result.recordset[0];
    if (!user) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving the user' });
  } finally {
    sql.close();
  }
};

export const updateUser = async (req, res) => {
  const { userId } = req.params;
  const { username, email } = req.body;
  try {
    let pool = await sql.connect(config.sql);
    const result = await pool
      .request()
      .input('userId', sql.Int, userId)
      .input('username', sql.VarChar, username)
      .input('email', sql.VarChar, email)
      .query(
        'UPDATE users SET username = @username, email = @email WHERE user_id = @userId'
      );
    if (result.rowsAffected[0] === 0) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.status(200).json({ message: 'User updated successfully' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the user' });
  } finally {
    sql.close();
  }
};

export const deleteUser = async (req, res) => {
  const { userId } = req.params;
  try {
    let pool = await sql.connect(config.sql);
    const result = await pool
      .request()
      .input('userId', sql.Int, userId)
      .query('DELETE FROM users WHERE user_id = @userId');
    if (result.rowsAffected[0] === 0) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.status(200).json({ message: 'User deleted successfully' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the user' });
  } finally {
    sql.close();
  }
};
