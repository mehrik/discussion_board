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
            var new_post = new Post(req.body);
            new_post.save(function (err, post) {
                // console.log('Errors in posts.create', err);
                // console.log('New post:', post);
                if (err) {
                    res.json(err);
                } else {
                    res.json(post);
                }// end if
            });// end save
        },// end function

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