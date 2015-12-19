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
        // may have to use deep populate as posts.comments would also need
        // to be populated
        show: function (req, res) {
            // Use findOne only for show methods
            // Populate topic with _user and posts
            // Topic.findOne({_id: req.params.id})
            // .populate('_user')
            // .populate('posts')
            // .exec(function (err, topic) {
            //     if (err) {
            //         res.json(err);
            //     } else {
            //         res.json(topic);
            //     }// end if
            // });// end function

            Topic.findOne({_id: req.params.id})
            .deepPopulate('_user.name posts._user.name posts.content posts.comments')
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
            var topic_id = req.params.id;
            var post_id = req.body._id;
            Topic.findByIdAndUpdate(
                topic_id,
                { $push: { posts: post_id }},
                function (err, topic) {
                    console.log('Errors in topics.update', err);
                    console.log('Topic found not updated', topic);
                    if (err) {
                        res.json(err);
                    } else {
                        // Topic object is returned, however no updated
                        // Topic update is saved after object is returned
                        res.json(topic);
                    }// end if
                });// end function and update
        }// end function
    }// end of object
})();