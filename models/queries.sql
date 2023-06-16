-- Create the database
CREATE DATABASE restApiDB;
GO
-- Use the created database
USE restApiDB;
GO

-- Create the "Users" table
CREATE TABLE Users (
    user_id INT PRIMARY KEY,
    username VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255)
);
GO

-- Create the "Posts" table
CREATE TABLE Posts (
    post_id INT PRIMARY KEY,
    title VARCHAR(255),
    content VARCHAR(255),
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);
GO

-- Create the "Comments" table
CREATE TABLE Comments (
    comment_id INT PRIMARY KEY,
    content VARCHAR(255),
    user_id INT,
    post_id INT,
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (post_id) REFERENCES Posts(post_id)
);
GO

-- Insert a new user
INSERT INTO Users (user_id, username, email, password)
VALUES (1, 'JohnDoe', 'johndoe@example.com', 'password123');
GO

-- Insert a new post
INSERT INTO Posts (post_id, title, content, user_id)
VALUES (1, 'New Post', 'This is a new post.', 1);
GO

-- Insert a new comment
INSERT INTO Comments (comment_id, content, user_id, post_id)
VALUES (1, 'Great post!', 1, 1);
GO

-- Retrieve information about a specific user
SELECT * FROM Users WHERE user_id = 1;
GO

-- Retrieve information about a specific post
SELECT * FROM Posts WHERE post_id = 1;
GO

-- Retrieve information about a specific comment
SELECT * FROM Comments WHERE comment_id = 1;
GO

-- Update the details of a user
UPDATE Users SET email = 'newemail@example.com' WHERE user_id = 1;
GO

-- Update the details of a post
UPDATE Posts SET title = 'Updated Post' WHERE post_id = 1;
GO

-- Update the details of a comment
UPDATE Comments SET content = 'Updated comment' WHERE comment_id = 1;
GO