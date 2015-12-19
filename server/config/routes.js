var bodyParser = require('body-parser');
var user = require('../controllers/users.js');
var topic = require('../controllers/topics.js');
var post = require('../controllers/posts.js');
var comment = require('../controllers/comments.js');
var category = require('../controllers/categories.js');

module.exports = function(app) {
    app.use(bodyParser.json());

    // Retrieve all
    app.get('/topic', topic.index);
    app.get('/post', post.index);
    app.get('/comment', comment.index);
    app.get('/category', category.index);

    // Create 
    app.post('/user', user.create);
    app.post('/topic', topic.create);
    app.post('/post', post.create);
    app.post('/comment', comment.create);

    // Retrieve one
    app.get('/user/:id', user.show);
    app.get('/topic/:id', topic.show);
    app.get('/post/:id', post.show);

    // Update one
    app.patch('/user/:id/topic', user.updateTopic);
    app.patch('/user/:id/post', user.updatePost);
    app.patch('/topic/:id', topic.update);
    app.patch('/post/:id', post.update);
}