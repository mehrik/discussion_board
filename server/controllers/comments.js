var mongoose = require('mongoose');
var Comment = mongoose.model('Comment');

module.exports = (function () {
    return {
        // Return all
        index: function (req, res) {
            res.json('comments.index');
        },
        // Create one
        create: function (req, res) {

            var comment = new Comment({
                _user: req.body.newComment._user,
                _post: req.body,
                content: req.body.newComment.content
            });
            comment.save(function (err, comment) {
                console.log(err, comment);
                if (err) {
                    res.json(err);
                } else {
                    res.json(comment);
                }// end if
            });// end save
        }// end create function
    }// end of object
})();