var mongoose = require('mongoose');
var Category = mongoose.model('Category');

module.exports = (function () {
    return {
        // Return all
        index: function (req, res) {
            Category.find({}, function (err, categories) {
                // console.log('categories.Errors', err);
                // console.log('Categories', categories);
                if (err) {
                    res.json(err);
                } else {
                    res.json(categories);
                }// end if
            });// end find
        }// end function
    }// end of object
})();