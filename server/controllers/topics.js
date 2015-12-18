var mongoose = require('mongoose');
var Topic = mongoose.model('Topic');

module.exports = (function () {
    return {
        // Return all
        index: function (req, res) {
            // Find all topics and populate their _user and _category field
            Topic.find({})
            .populate('_user')
            .populate('_category')
            .exec(function (err, topics) {
                // console.log('Errors', err);
                // console.log('Topics', topics);
                    if (err) {
                        res.json(err);
                    } else {
                        res.json(topics)
                    } // end if
                }); // end exec
        },// end function

        // Create one
        create: function (req, res) {
            // req.body should be an object that contains: 
            // _user Obj, _category Obj, title, description
            var new_topic = new Topic(req.body);
            new_topic.save(function (err, topic) {
                console.log('topics error', err);
                console.log('topics new', topic);
                if (err) {
                    res.json(err);
                } else {
                    res.json(topic);
                }// end if
            });// end save
        },// end function

        // Show one
        show: function (req, res) {
            // Use findOne only for show methods
            // Populate topic with _user and posts
            Topic.findOne({_id: req.params.id})
            .populate('_user')
            .populate('posts')
            .exec(function (err, topic) {
                if (err) {
                    res.json(err);
                } else {
                    res.json(topic);
                }// end if
            });// end function
        },
        // Update
        update: function (req, res) {
            res.json('topics.update');
        }
    }// end of object
})();