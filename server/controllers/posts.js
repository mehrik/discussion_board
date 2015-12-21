var mongoose = require('mongoose');
var Post = mongoose.model('Post');

module.exports = (function () {
    return {
        // Return all
        // Possibly delete later
        index: function (req, res) {
            Post.find({}, function (err, posts) {
                if (err) {
                    res.json(err);
                } else {
                    res.json(posts);
                }
            });
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
        // Inserts comments into comment array
        update: function (req, res) {
            res.json('posts.update');
        },
        // Updates likes
        updateLikes: function (req, res) {
            console.log(req.params.id);
            Post.findOneAndUpdate(
                {_id: req.params.id},
                {$inc: { likes: 1 }},
                function (err, post) {
                    // console.log(err, post);
                    res.json();
                }// end function
            );// end findOne
        },
        // Updates dislikes
        updateDislikes: function (req, res) {
            Post.findOneAndUpdate(
                {_id: req.params.id},
                {$inc: { dislikes: 1 }},
                function (err, post) {
                    // console.log(err, post);
                    res.json();
                }// end function
            );// end findOne
        }
    }// end of object
})();