import sql from 'mssql';
import config from '../models/config.js';

// Getting all posts
export const getAllPosts = async (req, res) => {
    try {
        let pool = await sql.connect(config.sql);
        const result = await pool.request().query("SELECT * FROM Posts");
        res.status(200).json(result.recordset);
    } catch (error) {
        console.error(error); 
        res.status(500).json({ error: 'An error occurred while retrieving posts' });
    } finally {
        sql.close(); 
    }
}

// Getting a specific post
export const getPost = async (req, res) => {
    try {
        let pool = await sql.connect(config.sql);
        const result = await pool.request()
            .input('id', sql.Int, req.params.id)
            .query("SELECT * FROM Posts WHERE post_id = @id");
        res.status(200).json(result.recordset);
    } catch (error) {
        console.error(error); 
        res.status(500).json({ error: 'An error occurred while retrieving post' });
    } finally {
        sql.close(); 
    }
}

// Creating a post
export const createPost = async (req, res) => {
    try {
        let pool = await sql.connect(config.sql);
        const result = await pool.request()
            .input('title', sql.NVarChar, req.body.title)
            .input('content', sql.NVarChar, req.body.content)
            .input('user_id', sql.Int, req.body.user_id)
            .query("INSERT INTO Posts (title, content, user_id) VALUES (@title, @content, @user_id)");
        res.status(200).json(result);
    } catch (error) {
        console.error(error); 
        res.status(500).json({ error: 'An error occurred while creating post' });
    } finally {
        sql.close(); 
    }
}

// Updating a post
export const updatePost = async (req, res) => {
    try {
        let pool = await sql.connect(config.sql);
        const result = await pool.request()
            .input('id', sql.Int, req.params.id)
            .input('title', sql.NVarChar, req.body.title)
            .input('content', sql.NVarChar, req.body.content)
            .input('user_id', sql.Int, req.body.user_id)
            .query("UPDATE Posts SET title = @title, content = @content, user_id = @user_id WHERE post_id = @id");
        res.status(200).json(result);
    } catch (error) {
        console.error(error); 
        res.status(500).json({ error: 'An error occurred while updating post' });
    } finally {
        sql.close(); 
    }
}

// Deleting a post
export const deletePost = async (req, res) => {
    try {
        let pool = await sql.connect(config.sql);
        const result = await pool.request()
            .input('id', sql.Int, req.params.id)
            .query("DELETE FROM Posts WHERE post_id = @id");
        res.status(200).json(result);
    } catch (error) {
        console.error(error); 
        res.status(500).json({ error: 'An error occurred while deleting post' });
    } finally {
        sql.close(); 
    }
}