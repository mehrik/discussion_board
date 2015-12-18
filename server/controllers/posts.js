var mongoose = require('mongoose');
var Post = mongoose.model('Post');

module.exports = (function () {
    return {
        // Return all
        index: function (req, res) {
            res.json('posts.index');
        },
        // Create one
        create: function (req, res) {
            res.json('posts.create');
        },
        // Show one
        show: function (req, res) {
            res.json('posts.show');
        },
        // Update
        update: function (req, res) {
            res.json('posts.update');
        }
    }// end of object
})();