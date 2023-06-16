import { getAllPosts, getPost, createPost, updatePost, deletePost } from '../controllers/postsController.js';
import { getAllComments, getComment, createComment, updateComment, deleteComment } from '../controllers/commentsController.js';
import { login, register, loginRequired } from '../controllers/userController.js';

const routes = (app) => {
  // Posts routes
  app.route('/posts')
    .get(loginRequired, getAllPosts)
    .post(loginRequired, createPost);

  app.route('/posts/:id')
    .get(loginRequired, getPost)
    .put(loginRequired, updatePost)
    .delete(loginRequired, deletePost);

  // Comments routes
  app.route('/comments')
    .get(loginRequired, getAllComments)
    .post(loginRequired, createComment);

  app.route('/comments/:id')
    .get(loginRequired, getComment)
    .put(loginRequired, updateComment)
    .delete(loginRequired, deleteComment);

  // Authentication routes
  app.route('/auth/register')
    .post(register);

  app.route('/auth/login')
    .post(login);
};

export default routes;
