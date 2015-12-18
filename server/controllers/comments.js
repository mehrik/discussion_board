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
            res.json('comments.create');
        }
    }// end of object
})();