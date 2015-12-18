var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = (function () {
    return {
        // Create one
        create: function (req, res) {
            // req.body should contain key value pair - { name: 'value' }
            // If user exists, return existing user to UserFactory
            // If user does not exist, create new user and return 
            // newly created user to UserFactory
            User.findOne({name: req.body.name}, function(err, user) {
                if (err) {
                    res.json(err);
                } else if (user) {
                    // console.log('User found', user);
                    res.json(user);
                } else {
                    // creation of new user
                    var new_user = new User(req.body);
                    new_user.save(function(err, user) {
                        // console.log('errors', err);
                        // console.log('returned', user);
                        if (err) {
                            res.json(err);
                        } else {  
                            res.json(user);
                        } // end else
                    }); // end save
                } // end else
            }); // end findOne

        }, // end function

        // Show one
        show: function (req, res) {
            // Use findOne only for show methods
            User.findOne({_id: req.params.id}, function (err, user) {
                if (err) {
                    res.json(err);
                } else {
                    res.json(user);
                }// end if
            });// end find
        },
        // Update
        updateTopic: function (req, res) {
            var user_id = req.body._user;
            var topic_id = req.body._id;
            User.findByIdAndUpdate(
                user_id,
                { $push: { topics: topic_id } },
                function (err, user) {
                    // console.log('Errors in updateTopic', err);
                    // console.log('User found', user);
                    if (err) {
                        res.json(err);
                    } else {
                        // user returned is not updated
                        // however afterwards information is updated
                        // after fully running the function
                        res.json(user)
                    }// end if
                });// end function and update
        }// end function
    }// end of object
})();