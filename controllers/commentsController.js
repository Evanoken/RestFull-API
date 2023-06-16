import sql from 'mssql';
import config from '../models/config.js';

// Getting all comments
export const getAllComments = async (req, res) => {
  try {
    let pool = await sql.connect(config.sql);
    const result = await pool.request().query('SELECT * FROM Comments');
    res.status(200).json(result.recordset);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: 'An error occurred while retrieving comments' });
  } finally {
    sql.close();
  }
};

// Getting a specific comment
export const getComment = async (req, res) => {
  try {
    let pool = await sql.connect(config.sql);
    const result = await pool.request()
      .input('id', sql.Int, req.params.id)
      .query('SELECT * FROM Comments WHERE comment_id = @id');
    res.status(200).json(result.recordset);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: 'An error occurred while retrieving comment' });
  } finally {
    sql.close();
  }
};

// Creating a comment
export const createComment = async (req, res) => {
  try {
    let pool = await sql.connect(config.sql);
    const result = await pool.request()
      .input('content', sql.NVarChar, req.body.content)
      .input('user_id', sql.Int, req.body.user_id)
      .input('post_id', sql.Int, req.body.post_id)
      .query('INSERT INTO Comments (content, user_id, post_id) VALUES (@content, @user_id, @post_id)');
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: 'An error occurred while creating comment' });
  } finally {
    sql.close();
  }
};

// Updating a comment
export const updateComment = async (req, res) => {
  try {
    let pool = await sql.connect(config.sql);
    const result = await pool.request()
      .input('id', sql.Int, req.params.id)
      .input('content', sql.NVarChar, req.body.content)
      .input('user_id', sql.Int, req.body.user_id)
      .input('post_id', sql.Int, req.body.post_id)
      .query('UPDATE Comments SET content = @content, user_id = @user_id, post_id = @post_id WHERE comment_id = @id');
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: 'An error occurred while updating comment' });
  } finally {
    sql.close();
  }
};

// Deleting a comment
export const deleteComment = async (req, res) => {
  try {
    let pool = await sql.connect(config.sql);
    const result = await pool.request()
      .input('id', sql.Int, req.params.id)
      .query('DELETE FROM Comments WHERE comment_id = @id');
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: 'An error occurred while deleting comment' });
  } finally {
    sql.close();
  }
};